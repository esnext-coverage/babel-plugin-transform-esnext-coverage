# babel-plugin-transform-esnext-coverage

[![Build Status](https://travis-ci.org/esnext-coverage/babel-plugin-transform-esnext-coverage.svg?branch=master)](https://travis-ci.org/esnext-coverage/babel-plugin-transform-esnext-coverage)

Instrumenter for [esnext-coverage](esnext-coverage).


## Installation

```sh
npm install babel-plugin-transform-esnext-coverage
```

## Usage

### Via `.babelrc`

```js
{
  "plugins": ["transform-esnext-coverage"]
}
```

If you need to run the instrumenter conditionally, use `env` variables, e.g. `NODE_ENV=test`:

```js
{
  "env": {
    "test": {
      "plugins": ["transform-esnext-coverage"]
    }
  }
}
```

### Via CLI

```sh
$ babel --plugins transform-esnext-coverage script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['transform-esnext-coverage']
});
```

## License

[MIT License](http://opensource.org/licenses/MIT)

[esnext-coverage]: https://github.com/esnext-coverage/esnext-coverage
