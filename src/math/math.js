/**
 * @module math
 * Contains general math methods
 */

/**
 * The [width, height] of a rectangle.
 * @typedef {number[]} Dimensions
 */

/**
 * Checks length of two Vectors, throwing error if unequal.
 * Mostly useful for internal debugging. May remove for final version.
 * @param  {number[]} v1 Vector
 * @param  {number[]} v2 Other Vector
 * @return {boolean}
 */
export const lengthCheck = (v1, v2) => {
  if (v1.length !== v2.length) throw new Error('Incompatible Dimensions');
  return true;
};

/**
 * Scales each dimension in a vector by a scalar.
 * @param  {number[]} vector Vector to scale
 * @param  {number}   scalar Scale factor
 * @return {number[]}        New vector
 */
export const scale = (vector, scalar) => vector.map(dim => dim * scalar);

/**
 * Computes the dot product of two Vectors of the same length.
 * @param  {number[]} v1 Vector
 * @param  {number[]} v2 Other Vector
 * @return {number}      The dot product of two vectors
 */
export const dot = (v1, v2) => lengthCheck(v1, v2) && v1.reduce(
  (sum, val, index) => sum + (val * v2[index]),
  0,
);

/**
 * Multiplies a Matrix and a Vector.
 * @param  {number[][]} mat Matrix
 * @param  {number[]}   vec Vector
 * @return {number[]}       New product Vector
 */
export const matrixVectorMultiply = (mat, vec) => mat.map(row => dot(row, vec));

/**
 * Makes a Matrix that will transform a set of dimensions [width, height]
 * in to the dimensions of the minimum bounding box that will fully contain
 * a rectangle with the original dimensions when rotated by the provided angle.
 * @param  {number} angle The rotation angle in radians.
 * @return {number[][]}   A Matrix representing the transformation.
 */
export const makeBoundsTransform = (angle) => {
  const absCos = Math.abs(Math.cos(angle));
  const absSin = Math.abs(Math.sin(angle));

  return [
    [absCos, absSin],
    [absSin, absCos],
  ];
};

/**
 * Calculates the dimensions of the minimum bounding box that will fully contain a
 * rectangle with the provided dimensions when rotated by the provided angle.
 * @param  {number}     angle      The rotation angle in radians
 * @param  {Dimensions} dimensions The dimensions of a rectangle
 * @return {Dimensions}            The dimensions of the minimum bounding box
 */
export const getBoundingDimensions = (angle, dimensions) =>
  matrixVectorMultiply(makeBoundsTransform(angle), dimensions);

/**
 * Finds the maximum scale factor that will allow a rectangle
 * to fit completely inside a bounding box. For example,
 * if you want to fit a rectangle of dimensions [4, 12] inside a box of
 * dimensions [8, 6], the scale factor would be 0.5.
 * @param  {Dimensions} boxDims    Dimensions of the bounding box
 * @param  {Dimensions} dimensions Dimensions of the rectangle you're trying to fit
 * @return {number}                The scale factor that will allow the rectangle to fit
 */
export const findScaleToFitWithin = ([bx, by], [rx, ry]) => Math.min(bx / rx, by / ry);

/**
 * Finds the scale factor that will allow a rectangle to fit inside
 * a box when rotated by the given angle.
 * @param  {number}     angle       Angle rectangle is rotated by
 * @param  {Dimensions} boxDims     Bounding box dimensions
 * @param  {Dimensions} dimensions  Rectangle dimensions
 * @return {number}                 The scale factor that will allow the rectangle to fit
 */
export const findScaleToFitAtAngle = (angle, boxDims, dimensions) =>
  findScaleToFitWithin(boxDims, getBoundingDimensions(angle, dimensions));

/**
 * Returns the scaled dimensions of a rectangle such that it will fit inside
 * a box of provided dimensions when rotated by a given angle.
 * @param  {number}     angle       Angle rectangle is rotated by
 * @param  {Dimensions} boxDims     Bounding box dimensions
 * @param  {Dimensions} dimensions  Rectangle dimensions
 * @return {number}                 Scaled dimensions
 */
export const scaleToFit = (angle, boxDims, dimensions) => scale(
  dimensions,
  findScaleToFitAtAngle(angle, boxDims, dimensions),
);
