import path from 'path';
import {runInNewContext} from 'vm';
import {codec} from 'esnext-coverage-analytics';
import transform from './transform';
import {defaultNamespace as namespace} from '../../../src/prelude';

export default function runFixture(fixtureName) {
  const fixturePath = path.resolve(__dirname, `../../fixture/${fixtureName}.fixture.js`);
  return transform(fixturePath)
    .then(({code}) => {
      // console.log(code);
      const sandbox = {
        require,
        global: {},
        exports: {}
      };
      runInNewContext(code, sandbox);
      const fileCoverage = sandbox.global[namespace].files[fixturePath].coverage;
      return codec.decodeAll(fileCoverage);
    })
    .catch(error => console.error(error)); // eslint-disable-line no-console
}
