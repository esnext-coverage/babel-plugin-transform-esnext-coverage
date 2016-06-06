/* eslint-disable no-unused-vars */

function letsThrow() { throw new Error('e'); }

try {
  // branch
  const o = {
    a: letsThrow(),
    b: 42
  };
} finally {
  // branch
}
