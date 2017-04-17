import {readFileSync} from 'fs';
import path from 'path';
import {types} from 'babel-core';
import template from 'babel-template';
import {codec} from 'esnext-coverage-analytics';
import {getCoverageMeta} from './meta';

const preludeFilePath = path.resolve(__dirname, 'templates/prelude-template.js');
const render = template(readFileSync(preludeFilePath, 'utf8'));

export const defaultNamespace = '__coverage__';

function normalizeTokenType(tokenType) {
  if (tokenType === 'CommentBlock' || tokenType === 'CommentLine') { return 'comment'; }
  if (tokenType.keyword) { return 'keyword'; }
  if (tokenType.label) { return tokenType.label; }
  return 'other';
}

function simplifyToken({loc, type}) {
  return {loc, type: normalizeTokenType(type)};
}

export default function prelude(state) {
  const {variable, locations} = getCoverageMeta(state);
  const name = state.file.opts.filenameRelative.replace(`${process.cwd()}${path.sep}`, '');
  const namespace = state.opts && state.opts.global || defaultNamespace;
  const tokens = state.file.ast.tokens.map(simplifyToken).map(codec.encodeToken);
  return render({
    VARIABLE: variable,
    NAMESPACE: types.stringLiteral(namespace),
    FILEPATH: types.stringLiteral(name),
    TOKENS: types.stringLiteral(JSON.stringify(tokens)),
    LOCATIONS: types.stringLiteral(JSON.stringify(locations))
  });
}
