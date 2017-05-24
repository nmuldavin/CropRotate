import * as math from './math';

describe('(Library) math', () => {
  describe('(Function) dot', () => {
    it('should correctly compute the dot product of two vectors', () => {
      math.dot([1, 2], [2, 3]).should.eql(8);
    });

    it('should throw when asked to compute dot product of vectors of different length', () => {
      expect(() => math.dot([1, 2], [1, 2, 3])).to.throw('Incompatible Dimensions');
    });

    it('should return zero when dotting empty vectors', () => {
      math.dot([], []).should.eql(0);
    });
  });

  describe('(Function) matrixVectorMultiply', () => {
    it('should correctly multiply matrices and vectors', () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ];

      const vector = [1, 2];

      expect(math.matrixVectorMultiply(matrix, vector)).to.eql([5, 11]);
    });

    it('should throw when asked to multiply matrix and vector of Incompatible dimensions', () => {
      expect(() => math.matrixVectorMultiply([1], [1, 1])).to.throw('Incompatible Dimensions');
    });
  });

  describe('(Function) getBoundingDimensions', () => {
    it('should return the correct dimensions', () => {
      math.getBoundingDimensions([1, 2], 0).should.almost.eql([1, 2]);
      math.getBoundingDimensions([1, 2], Math.PI / 2).should.almost.eql([2, 1]);
      math.getBoundingDimensions([1, 2], Math.PI).should.almost.eql([1, 2]);
      math.getBoundingDimensions([1, 2], 3 * (Math.PI / 2)).should.almost.eql([2, 1]);

      math.getBoundingDimensions([1, 2], Math.PI / 4)
        .should.almost.eql([1.5 * Math.sqrt(2), 1.5 * Math.sqrt(2)]);
    });
  });
});
