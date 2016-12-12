import {types as t} from 'babel-core';
import {createMarker, markAsInstrumented} from './marker';

export function isInstrumentableStatement({parentPath}) {
  return parentPath.isBlockStatement() || parentPath.isProgram();
}

// 42 ---> _increment(0, 42);
export function instrumentExpression(path, state, tags = ['expression']) {
  const isEmptyNode = !path.node;
  const loc = isEmptyNode ? path.parent.loc : path.node.loc;
  const node = isEmptyNode ? t.identifier('undefined') : path.node;
  path.replaceWith(createMarker(state, {loc, tags}, node));
}

// break; ---> _increment(0); break;
export function instrumentStatement(path, state, tags = ['statement']) {
  if (!isInstrumentableStatement(path)) { return; }
  const loc = path.node.loc;
  const marker = createMarker(state, {loc, tags});
  path.insertBefore(markAsInstrumented(
    t.expressionStatement(marker)
  ));
}

// {} ---> { _increment(0); }
export function instrumentBlock(container, path, state, tags = ['block']) {
  const loc = path.node.loc;
  const marker = createMarker(state, {loc, tags});
  markAsInstrumented(path).unshiftContainer(container, markAsInstrumented(
    t.expressionStatement(marker)
  ));
}

// {a: 42} ---> {['a']: 42}
export function instrumentObjectProperty(path, state) {
  if (path.node.computed) { return; }
  const oldKey = path.get('key');
  const newKey = oldKey.isLiteral() ? oldKey : t.stringLiteral(oldKey.node.name);
  newKey.loc = oldKey.node.loc;
  oldKey.replaceWith(markAsInstrumented(newKey));
  path.node.computed = true;
  instrumentExpression(path.get('key'), state);
}

export function instrumentClassProperty(path, state, tags = ['statement', 'property']) {
  const value = path.get('value');
  const isEmptyNode = !value.node;
  const {loc} = isEmptyNode ? path.parent : path.node;
  const node = isEmptyNode ? t.identifier('undefined') : value.node;
  const marker = createMarker(state, {loc, tags}, node);
  value.replaceWith(marker);
}

export function instrumentConditionBranch(path, state, tags = ['branch']) {
  if (path.isBlockStatement()) {
    // before: if (true) {};
    // after: if (true) { instrument(0); };
    instrumentBlock('body', path, state, tags);
  } else if (path.isEmptyStatement()) {
    // before: if (true);
    // after: if (true) instrument(0);
    const marker = createMarker(state, {loc: path.node.loc, tags});
    path.replaceWith(markAsInstrumented(
      t.expressionStatement(marker)
    ));
  } else {
    // before: if (true) true;
    // after: if (true) { instrument(0); true; }
    const branchBody = t.blockStatement([path.node]);
    const locEnd = path.node.loc.end;
    branchBody.loc = {start: locEnd, end: locEnd};
    path.replaceWith(markAsInstrumented(branchBody));
    instrumentBlock('body', path, state, tags);
  }
}
