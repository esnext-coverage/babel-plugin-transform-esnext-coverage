import test from 'tape';
import runFixture from './helpers/run';
import {isDirective} from './helpers/tag-assert';

//
// Directives
// --------------------

test('coverage should count directives', t => {
  t.plan(3);
  runFixture('directives').then(locations => {
    const directiveLocations = locations.filter(isDirective);
    const executedOnceDirectiveLocations = directiveLocations
      .filter(l => l.count === 1);
    const executedNeverDirectiveLocations = directiveLocations
      .filter(l => l.count === 0);

    // There is a total of 6 directives:
    t.equal(directiveLocations.length, 6);
    // 4 of them have been executed once:
    t.equal(executedOnceDirectiveLocations.length, 4);
    // 2 of them have never been executed:
    t.equal(executedNeverDirectiveLocations.length, 2);
  });
});
