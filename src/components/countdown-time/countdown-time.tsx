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
  predefinedSlot: HTMLElement;
  predefinedSlotHTML: string;

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
  datetime: string | number = null;
  /**
   * @deprecated
   * Showing format, {d} = days, {h} hours, {m} minutes and {s} seconds.
   */
  @Prop({ reflectToAttr: false }) format = '{h}:{m}:{s}';
  /**
   * Add more time to current datetime separated by spaces, ex: add="1h 30m"
   */
  @Prop({ reflectToAttr: true }) add: string;
  /**
   * Whether start or not when countdown is ready, if not, you must start it manually.
   */
  @Prop({ reflectToAttr: true }) autostart = false;
  /**
   * Convert date to UTC
   */
  @Prop({ reflectToAttr: true }) utc = false;

  private finishCounting: number;
  private counting = 1;

  @State() state: IState = {
    started: false,
    expired: false
  };
  @State() timeObject: ITimeObject = {
    weeks: '0',
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  @Watch('datetime') validateDate(newValue: string, oldValue: string) {
    if (isNaN(new Date(newValue).valueOf())) {
      this.datetime = oldValue;
      // throw new Error('Invalid date was provided, fallback to old value.');
    }
  }

  /**
   * Start countdown manually.
   */
  @Method() async start() {
    this.setState({ started: true });
    this.interval = setInterval(async () => {
      await this.runCountDown(), this.replaceSlotInnerHtml();
    }, periodTimes.s);
    return Promise.resolve(this.interval);
  }
  /**
   * Stop/Pause countdown manually.
   */
  @Method() async stop() {
    if (this.interval) {
      await clearInterval(this.interval);
    }
    this.setState({ started: false });
  }
  /**
   * Restart countdown manually.
   */
  @Method() async restart() {
    this.counting = 1;
    await this.stop(), await this.start();
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

  private setState(newState: IState) {
    this.state = { ...this.state, ...newState };
  }

  private getDateTimeAttr() {
    return new Date(this.finishCounting).toJSON().substring(0, 19);
  }

  private convertToUTCDate(date: number | string) {
    const datetime = new Date(+date || date);
    return Date.UTC(
      datetime.getFullYear(),
      datetime.getMonth(),
      datetime.getDate(),
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
      datetime.getMilliseconds()
    );
  }

  private replaceSlotInnerHtml() {
    if (this.predefinedSlot) {
      this.predefinedSlot.innerHTML = this.replacePlaceholders(
        this.predefinedSlotHTML
      );
    }
  }

  private replacePlaceholders(html = this.format) {
    const { weeks, days, hours, minutes, seconds } = this.timeObject;
    return html.replace(/({\w{1,}})/g, (match: string) => {
      if (match === '{w}') return weeks;
      if (match === '{d}') return days;
      if (match === '{h}') return hours;
      if (match === '{m}') return minutes;
      if (match === '{s}') return seconds;
      return match;
    });
  }

  private renderTimeToString(distance = this.finishCounting) {
    const { week, day, hour, minute, second } = numberTimes;
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    this.timeObject = {
      weeks: `${Math.floor(distance / week)}`,
      days: `${Math.floor((distance % week) / day)}`,
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
    };
  }

  private checkAndConvertDateTime() {
    let time = new Date(this.datetime).getTime() || Date.now();
    if (this.utc) {
      time = this.convertToUTCDate(time);
    }
    if (this.add) {
      let date = new Date(time);
      const times = this.add.trim().split(' ');
      times.forEach((time: string) => {
        const [, count, period] = time.match(/(\d+)(\w+)/);
        date = new Date(date.getTime() + +count * periodTimes[period]);
      });
      time = date.getTime() - (this.datetime ? 0 : time);
    }
    return time;
  }

  private async runCountDown() {
    const minusTime = periodTimes.s * this.counting;
    const distance = this.finishCounting - minusTime;
    if (distance <= 0) {
      await this.setAsExpired();
    } else {
      this.counting++;
    }
    return this.renderTimeToString(distance);
  }

  async componentWillLoad() {
    this.showOnExpiredElement = this.el.querySelector('[show-on-expired]');
    if (this.showOnExpiredElement) {
      this.showOnExpiredElement.remove();
    }
    if (this.el.querySelector('[slot]')) {
      this.predefinedSlot = this.el.querySelector('[slot]');
      this.predefinedSlotHTML = this.predefinedSlot.innerHTML;
    }
    this.finishCounting = this.checkAndConvertDateTime();
  }
  async componentDidLoad() {
    this.ready.emit();
    await this.renderTimeToString();
    this.replaceSlotInnerHtml();
    if (this.autostart) {
      await this.start();
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
    return (
      <slot>
        {this.datetime ? (
          <time dateTime={this.getDateTimeAttr()}>
            {this.replacePlaceholders()}
          </time>
        ) : (
          this.replacePlaceholders()
        )}
      </slot>
    );
  }
}
