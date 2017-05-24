const pipe = (val, ...fns) => fns
  .reduce((accum, fn) => fn(accum), val);

const lengthCheck = (v1, v2) => {
  if (v1.length !== v2.length) throw new Error('Incompatible Dimensions');
  return true;
};

export const dot = (v1, v2) => lengthCheck(v1, v2) && v1.reduce(
  (sum, val, index) => sum + (val * v2[index]),
  0,
);

const makeTransformMatrix = (angle) => {
  const absCos = pipe(angle, Math.cos, Math.abs);
  const absSin = pipe(angle, Math.sin, Math.abs);

  return [
    [absCos, absSin],
    [absSin, absCos],
  ];
};

export const matrixVectorMultiply = (mat, vec) => mat.map(row => dot(row, vec));

export const getBoundingDimensions = (dims, angle) =>
  matrixVectorMultiply(makeTransformMatrix(angle), dims);
