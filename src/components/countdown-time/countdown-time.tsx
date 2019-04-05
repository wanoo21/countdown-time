import {
  Event,
  Element,
  Component,
  Prop,
  Method,
  EventEmitter,
  Watch,
  State
} from '@stencil/core';
import { numberTimes, periodTimes } from '../../utils';
import { IState, ITimeObject } from '../../interfaces';

@Component({
  tag: 'countdown-time',
  styleUrl: 'countdown-time.css',
  shadow: false
})
export class CountDownTime {
  interval: number;
  showOnExpiredElement: HTMLElement;

  @Element() el: HTMLElement;

  /**
   * Emit when countdown expires.
   */
  @Event() expire: EventEmitter;
  /**
   * Emit when countdown is ready to start.
   */
  @Event() ready: EventEmitter;
  /**
   * Emit each time when it changes.
   */
  @Event() change: EventEmitter;

  /**
   * Datetime to countdown, must be a valid date
   */
  @Prop({ mutable: true, reflectToAttr: true })
  datetime: string = new Date().toString();
  /**
   * Showing format, {d} = days, {h} hours, {m} minutes and {s} seconds.
   */
  @Prop({ reflectToAttr: true }) format: string = '{d}d, {h}:{m}:{s}';
  /**
   * Add more time to current datetime separated by spaces, ex: add="1h 30m"
   */
  @Prop({ reflectToAttr: true }) add: string;
  /**
   * Whether start or not when countdown is ready, if not, you must start it manually.
   */
  @Prop({ reflectToAttr: true }) autostart: boolean = false;

  @State() state: IState = {
    started: false,
    expired: false
  };
  @State() timeObject: ITimeObject = {
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  @Watch('datetime') validateDate(newValue: string, oldValue: string) {
    if (isNaN(new Date(newValue).valueOf())) {
      this.datetime = oldValue;
      throw new Error('Invalid date was provided, fallback to old value.');
    }
  }

  /**
   * Start countdown manually.
   */
  @Method() async start() {
    this.setState({ started: true });
    this.interval = setInterval(
      async () => await this.calculateCountDown(),
      1000
    );
    await Promise.resolve();
  }
  /**
   * Stop countdown manually.
   */
  @Method() async stop() {
    this.setState({ started: false });
    if (this.interval) {
      await clearInterval(this.interval);
    }
  }
  /**
   * Restart countdown manually.
   */
  @Method() async restart() {
    if (this.state.started) {
      await this.stop();
    }
    await this.start();
  }
  /**
   * Set as expired manually, it'll stop and do everything as expired.
   */
  @Method() async setAsExpired() {
    this.setState({ expired: true });
    this.expire.emit();
    await this.stop();
    this.showOnExpiredElement && this.el.appendChild(this.showOnExpiredElement);
  }
  /**
   * Get countdown time as object.
   */
  @Method() async getCountDownTime() {
    return this.timeObject;
  }

  async setState(newState: IState) {
    this.state = { ...this.state, ...newState };
    return Promise.resolve();
  }
  async calculateCountDown() {
    const { day, hour, minute, second } = numberTimes;
    const distance = new Date(this.datetime).getTime() - new Date().getTime();
    if (distance < 0) {
      await this.setAsExpired();
      return;
    }
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    this.timeObject = {
      days: `${Math.floor(distance / day)}`,
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
    };
    return Promise.resolve();
  }
  async addMoreTime() {
    let date = new Date(this.datetime);
    this.add.split(' ').forEach((time: string) => {
      const [, count, period] = time.match(/(\d+)(\w+)/);
      date = new Date(date.getTime() + +count * periodTimes[period]);
    });
    this.datetime = date.toString();
    return Promise.resolve();
  }
  getDateTimeAttr() {
    return new Date(this.datetime).toJSON().substring(0, 19);
  }
  getFormattedTime() {
    const { days, hours, minutes, seconds } = this.timeObject;
    return this.format.replace(/({\w{1,}})/g, (match: string) => {
      if (match === '{d}') return days;
      if (match === '{h}') return hours;
      if (match === '{m}') return minutes;
      if (match === '{s}') return seconds;
      return '';
    });
  }

  async componentWillLoad() {
    this.showOnExpiredElement = this.el.querySelector('[show-on-expired]');
    if (this.showOnExpiredElement) {
      this.showOnExpiredElement.remove();
    }
  }

  async componentDidLoad() {
    this.ready.emit();
    if (this.add) {
      await this.addMoreTime();
    }
    await this.calculateCountDown();
    if (this.autostart) {
      await this.restart();
    }
  }
  async componentDidUnload() {
    await this.stop();
  }
  componentDidUpdate() {
    this.change.emit();
  }

  hostData() {
    return {
      class: this.state
    };
  }
  render() {
    if (!this.state.expired) {
      return (
        <time dateTime={this.getDateTimeAttr()}>{this.getFormattedTime()}</time>
      );
    }
  }
}
