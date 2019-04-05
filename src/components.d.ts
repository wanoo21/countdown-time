/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  ITimeObject,
} from './interfaces';


export namespace Components {

  interface CountdownTime {
    'add': string;
    'autostart': boolean;
    'datetime': string;
    'format': string;
    'getCountDownTime': () => Promise<ITimeObject>;
    'restart': () => Promise<void>;
    'setAsExpired': () => Promise<void>;
    'start': () => Promise<void>;
    'stop': () => Promise<void>;
  }
  interface CountdownTimeAttributes extends StencilHTMLAttributes {
    'add'?: string;
    'autostart'?: boolean;
    'datetime'?: string;
    'format'?: string;
    'onExpire'?: (event: CustomEvent) => void;
    'onReady'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'CountdownTime': Components.CountdownTime;
  }

  interface StencilIntrinsicElements {
    'countdown-time': Components.CountdownTimeAttributes;
  }


  interface HTMLCountdownTimeElement extends Components.CountdownTime, HTMLStencilElement {}
  var HTMLCountdownTimeElement: {
    prototype: HTMLCountdownTimeElement;
    new (): HTMLCountdownTimeElement;
  };

  interface HTMLElementTagNameMap {
    'countdown-time': HTMLCountdownTimeElement
  }

  interface ElementTagNameMap {
    'countdown-time': HTMLCountdownTimeElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
