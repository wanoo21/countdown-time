# countdown-time

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute   | Description | Type      | Default               |
| ----------- | ----------- | ----------- | --------- | --------------------- |
| `add`       | `add`       |             | `string`  | `undefined`           |
| `autostart` | `autostart` |             | `boolean` | `false`               |
| `datetime`  | `datetime`  |             | `string`  | `this.now.toString()` |
| `format`    | `format`    |             | `string`  | `'{d}d, {h}:{m}:{s}'` |

## Events

| Event    | Description | Type                |
| -------- | ----------- | ------------------- |
| `expire` |             | `CustomEvent<void>` |
| `ready`  |             | `CustomEvent<void>` |

## Methods

### `getCountDownTime() => Promise<ITimeObject>`

#### Returns

Type: `Promise<ITimeObject>`

### `restart() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `setAsExpired() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `start() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `stop() => Promise<void>`

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
