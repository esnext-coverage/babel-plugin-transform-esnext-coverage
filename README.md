# babel-plugin-transform-esnext-coverage

[![NPM version](http://img.shields.io/npm/v/babel-plugin-transform-esnext-coverage.svg)](https://www.npmjs.org/package/babel-plugin-transform-esnext-coverage)
[![Build Status](https://travis-ci.org/esnext-coverage/babel-plugin-transform-esnext-coverage.svg?branch=master)](https://travis-ci.org/esnext-coverage/babel-plugin-transform-esnext-coverage)

Instrumenter for [esnext-coverage](https://github.com/esnext-coverage/esnext-coverage).


## Installation

```sh
npm install babel-plugin-transform-esnext-coverage --save-dev
```

## Usage

### `.babelrc`

It is recommended that you run the instrumenter conditionally, using `env` variables, e.g. `NODE_ENV=test`:

```json
{
  "env": {
    "test": {
      "plugins": ["transform-esnext-coverage"]
    }
  }
}
```

### CLI

```sh
$ babel --plugins transform-esnext-coverage script.js
```

### Node API

```js
require('babel-core').transform('code', {
  plugins: ['transform-esnext-coverage']
});
```

## License

[MIT License](http://opensource.org/licenses/MIT)
