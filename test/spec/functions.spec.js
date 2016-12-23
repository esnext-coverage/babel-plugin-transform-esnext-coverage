import test from 'tape';
import runFixture from './helpers/run';
import {isFunction, isStatement, isBranch} from './helpers/tag-assert';

//
// Normal functions
// --------------------

test('coverage should count function declarations', t => {
  t.plan(3);
  runFixture('function-declarations').then(locations => {
    const statementLocations = locations.filter(isStatement);
    t.equal(statementLocations.length, 2);
    t.equal(statementLocations[0].count, 1);
    t.equal(statementLocations[1].count, 1);
  });
});

test('coverage should count functions declared after return statment', t => {
  t.plan(3);
  runFixture('function-after-return').then(locations => {
    const functionLocations = locations.filter(isFunction);
    const statementLocations = locations.filter(isStatement);
    const declaredOnceFunctionLocations = functionLocations
      .filter(el => el.count === 1);
    const executedOnceStatementLocations = statementLocations
      .filter(el => el.count === 1);

    // There are two functions:
    t.equal(functionLocations.length, 2);
    // Both functions have been declared once:
    t.equal(declaredOnceFunctionLocations.length, 2);
    // All statements have been executed once:
    t.equal(executedOnceStatementLocations.length, 4);
  });
});

test('coverage should count function executions', t => {
  t.plan(4);
  runFixture('function-executions').then(locations => {
    const functionLocations = locations.filter(isFunction);
    t.equal(functionLocations.length, 3);
    t.equal(functionLocations[0].count, 0);
    t.equal(functionLocations[1].count, 1);
    t.equal(functionLocations[2].count, 2);
  });
});

test('coverage should count default parameters as branches', t => {
  t.plan(3);
  runFixture('function-default-parameters').then(locations => {
    const branchLocations = locations.filter(isBranch);
    const executedOnceBranchLocations = branchLocations.filter(el => el.count === 1);
    const executedNeverBranchLocations = branchLocations.filter(el => el.count === 0);
    t.equal(branchLocations.length, 2);
    t.equal(executedOnceBranchLocations.length, 1);
    t.equal(executedNeverBranchLocations.length, 1);
  });
});

//
// Fat arrow functions
// --------------------

test('coverage should count fat arrow function declarations', t => {
  t.plan(3);
  runFixture('function-arrow-fat-declarations').then(locations => {
    const statementLocations = locations.filter(isStatement);
    t.equal(statementLocations.length, 2);
    t.equal(statementLocations[0].count, 1);
    t.equal(statementLocations[1].count, 1);
  });
});

test('coverage should count fat arrow function executions', t => {
  t.plan(3);
  runFixture('function-arrow-fat-executions').then(locations => {
    const functionLocations = locations.filter(isFunction);
    t.equal(functionLocations.length, 2);
    t.equal(functionLocations[0].count, 0);
    t.equal(functionLocations[1].count, 3);
  });
});

test('coverage should count fat arrow function\'s default parameters as branches', t => {
  t.plan(3);
  runFixture('function-arrow-fat-default-parameters').then(locations => {
    const branchLocations = locations.filter(isBranch);
    const executedOnceBranchLocations = branchLocations.filter(el => el.count === 1);
    const executedNeverBranchLocations = branchLocations.filter(el => el.count === 0);
    t.equal(branchLocations.length, 2);
    t.equal(executedOnceBranchLocations.length, 1);
    t.equal(executedNeverBranchLocations.length, 1);
  });
});
