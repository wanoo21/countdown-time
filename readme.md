![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

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
| `format`    | `format`    |                                                                                   | `string`          | `'{h}:{m}:{s}'` |
| `utc`       | `utc`       | Convert date to UTC                                                               | `boolean`         | `false`         |

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

### `start() => Promise<number>`

Start countdown manually.

#### Returns

Type: `Promise<number>`

### `stop() => Promise<void>`

Stop/Pause countdown manually.

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
