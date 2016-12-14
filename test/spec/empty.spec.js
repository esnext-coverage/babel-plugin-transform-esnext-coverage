import test from 'tape';
import runFixture from './helpers/run';

test('coverage should have an empty locations array', t => {
  t.plan(2);
  runFixture('empty').then(locations => {
    t.equal(Array.isArray(locations), true);
    t.equal(locations.length, 0);
  });
});
