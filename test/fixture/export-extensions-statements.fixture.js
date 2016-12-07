// The path is weird because it is relative to test/spec/helpers/run.js

// one export statement
export {foo, a} from '../../fixture/export-statements.fixture.js';

// one export statement
export {
  foo as fooExported,
  a as aExported
} from '../../fixture/export-statements.fixture.js';
