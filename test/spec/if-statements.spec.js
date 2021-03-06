import test from 'tape';
import runFixture from './helpers/run';
import {isExpression, isBranch} from './helpers/tag-assert';

//
// If statements
// --------------------

test('coverage should count if-statement test expressions', t => {
  t.plan(2);
  runFixture('if-statements').then(locations => {
    const testExpressions = locations.filter(isExpression);
    const executedOnceTestExpressions = testExpressions
      .filter(l => l.count === 1);

    // There are two tests (final else branch has no test):
    t.equal(testExpressions.length, 2);
    // Only one of two test has actually run (the truthy one):
    t.equal(executedOnceTestExpressions.length, 1);
  });
});

test('coverage should count if-statement branches', t => {
  t.plan(2);
  runFixture('if-statements').then(locations => {
    const testBranches = locations.filter(isBranch);
    const executedOnceTestBranches = testBranches
      .filter(l => l.count === 1);

    // There are three branches:
    t.equal(testBranches.length, 3);
    // Only one of the three branches has actually run (the truthy one):
    t.equal(executedOnceTestBranches.length, 1);
  });
});

test('coverage should count empty branches in if-statements', t => {
  t.plan(3);
  runFixture('if-statements-empty').then(locations => {
    const branchLocations = locations.filter(isBranch);
    const executedOnceBranchLocations = branchLocations
      .filter(l => l.count === 1);
    const executedNeverBranchLocations = branchLocations
      .filter(l => l.count === 0);

    // There are three branches (all implicit):
    t.equal(branchLocations.length, 3);
    // Only one of the three branches has actually run:
    t.equal(executedOnceBranchLocations.length, 1);
    // Other two branches have never run:
    t.equal(executedNeverBranchLocations.length, 2);
  });
});

test('coverage should count blockless branches in if-statements', t => {
  t.plan(3);
  runFixture('if-statements-no-block').then(locations => {
    const branchLocations = locations.filter(isBranch);
    const executedOnceBranchLocations = branchLocations
      .filter(l => l.count === 1);
    const executedNeverBranchLocations = branchLocations
      .filter(l => l.count === 0);

    // There are three branches (all implicit):
    t.equal(branchLocations.length, 3);
    // Only one of the three branches has actually run:
    t.equal(executedOnceBranchLocations.length, 1);
    // Other two branches have never run:
    t.equal(executedNeverBranchLocations.length, 2);
  });
});

test('coverage should count missing alternate branches in if-statements', t => {
  t.plan(2);
  runFixture('if-statements-no-alternate').then(locations => {
    const testBranches = locations.filter(isBranch);
    const executedOnceTestBranches = testBranches
      .filter(l => l.count === 1);

    // There are two branches (one is implicit):
    t.equal(testBranches.length, 2);
    // Only one of the two branches has actually run:
    t.equal(executedOnceTestBranches.length, 1);
  });
});
