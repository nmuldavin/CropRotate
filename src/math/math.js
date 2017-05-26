const lengthCheck = (v1, v2) => {
  if (v1.length !== v2.length) throw new Error('Incompatible Dimensions');
  return true;
};

const makeTransformMatrix = (angle) => {
  const absCos = Math.abs(Math.cos(angle));
  const absSin = Math.abs(Math.sin(angle));

  return [
    [absCos, absSin],
    [absSin, absCos],
  ];
};

export const dot = (v1, v2) => lengthCheck(v1, v2) && v1.reduce(
  (sum, val, index) => sum + (val * v2[index]),
  0,
);

export const matrixVectorMultiply = (mat, vec) => mat.map(row => dot(row, vec));

export const getBoundingDimensions = (dims, angle) =>
  matrixVectorMultiply(makeTransformMatrix(angle), dims);
