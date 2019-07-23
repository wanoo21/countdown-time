# countdown-time

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                       | Type               | Default         |
| ----------- | ----------- | --------------------------------------------------------------------------------- | ------------------ | --------------- |
| `add`       | `add`       | Add more time to current datetime separated by spaces, ex: add="1h 30m"           | `string`           | `undefined`     |
| `autostart` | `autostart` | Whether start or not when countdown is ready, if not, you must start it manually. | `boolean`          | `false`         |
| `datetime`  | `datetime`  | Datetime to countdown, must be a valid date                                       | `number \| string` | `Date.now()`    |
| `format`    | `format`    |                                                                                   | `string`           | `'{h}:{m}:{s}'` |
| `utc`       | `utc`       | Convert date to UTC                                                               | `boolean`          | `false`         |


## Events

| Event    | Description                            | Type                |
| -------- | -------------------------------------- | ------------------- |
| `change` | Emit each time when it changes.        | `CustomEvent<void>` |
| `expire` | Emit when countdown expires.           | `CustomEvent<void>` |
| `ready`  | Emit when countdown is ready to start. | `CustomEvent<void>` |


## Methods

### `getCountDownTime() => Promise<ITimeObject>`

Get countdown time as object.

#### Returns

Type: `Promise<ITimeObject>`



### `restart() => Promise<void>`

Restart countdown manually.

#### Returns

Type: `Promise<void>`



### `setAsExpired() => Promise<void>`

Set as expired manually, it'll stop and do everything as expired.

#### Returns

Type: `Promise<void>`



### `start() => Promise<void>`

Start countdown manually.

#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`

Stop countdown manually.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
