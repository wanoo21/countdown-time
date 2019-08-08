# Countdown to any time Web Component

Create a flexible and powerfull countdown to any future dates.

## Getting Started

- Run `npm i @wanoo21/countdown-time`
- Add an import to the npm packages `import '@wanoo21/countdown-time';`
- Then you can use the element anywhere in your template, JSX, html etc as `<countdown-time add="1h 30m"></countdown-time>`

Read more about this [Countdown Web Component](https://yon.fun/simple-and-powerful-countdown-in-js/).

## Properties

| Property    | Attribute   | Description                                                                       | Type              | Default         |
| ----------- | ----------- | --------------------------------------------------------------------------------- | ----------------- | --------------- |
| `add`       | `add`       | Add more time to current datetime separated by spaces, ex: add="1h 30m"           | `string`          | `undefined`     |
| `autostart` | `autostart` | Whether start or not when countdown is ready, if not, you must start it manually. | `boolean`         | `false`         |
| `datetime`  | `datetime`  | Datetime to countdown, must be a valid date                                       | `number | string` | `null`          |
| `format`    | `format`    | Showing format, {d} = days, {h} hours, {m} minutes and {s} seconds.               | `string`          | `'{h}:{m}:{s}'` |
| `utc`       | `utc`       | Convert date to UTC                                                               | `boolean`         | `false`         |

## Events

| Event     | Description                            | Type                |
| --------- | -------------------------------------- | ------------------- |
| `change`  | Emit each time when it changes.        | `CustomEvent<void>` |
| `expire`  | Emit when countdown expires.           | `CustomEvent<void>` |
| `ready`   | Emit when countdown is ready to start. | `CustomEvent<void>` |
| `started` | Emit when countdown in started.        | `CustomEvent<void>` |
| `stopped` | Emit when countdown in stopped.        | `CustomEvent<void>` |

## Methods

### `getCountDownTime() => Promise<ITimeObject>`

Get countdown time as object.

#### Returns

Type: `Promise<ITimeObject>`

### `reDraw() => Promise<void>`

Re-Draw manually countdown after changing the 'add' or 'datetime' property

#### Returns

Type: `Promise<void>`

### `restart() => Promise<void>`

Restart countdown manually.

#### Returns

Type: `Promise<void>`

### `setAsExpired() => Promise<void>`

Set as expired manually, it'll stop and do everything as expired.

#### Returns

Type: `Promise<void>`

### `start() => Promise<number>`

Start countdown manually.

#### Returns

Type: `Promise<number>`

### `stop() => void`

Stop/Pause countdown manually.

#### Returns

Type: `void`

---

_Built with [StencilJS](https://stenciljs.com/)_
