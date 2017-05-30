import * as math from './math';

describe('(Library) math', () => {
  describe('(Function) scale', () => {
    it('should correctly scale a vector', () => {
      math.scale([1, 2, 3], 10).should.almost.eql([10, 20, 30]);
    });
  });

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
      math.getBoundingDimensions(0, [1, 2]).should.almost.eql([1, 2]);
      math.getBoundingDimensions(Math.PI / 2, [1, 2]).should.almost.eql([2, 1]);
      math.getBoundingDimensions(Math.PI, [1, 2]).should.almost.eql([1, 2]);
      math.getBoundingDimensions(3 * (Math.PI / 2), [1, 2]).should.almost.eql([2, 1]);

      math.getBoundingDimensions(Math.PI / 4, [1, 2])
        .should.almost.eql([1.5 * Math.sqrt(2), 1.5 * Math.sqrt(2)]);
    });
  });

  describe('(Function) findScaleToFitWithin', () => {
    it('should return correct scale', () => {
      expect(math.findScaleToFitWithin([1, 1], [1, 2])).to.almost.equal(0.5);
      expect(math.findScaleToFitWithin([1, 2], [1, 2])).to.almost.equal(1);
      expect(math.findScaleToFitWithin([1, 2], [4, 1])).to.almost.equal(0.25);
    });
  });

  describe('(Function) scaleToFit', () => {
    it('should return correct scale', () => {
      expect(math.scaleToFit(0, [1, 1], [1, 2])).to.almost.eql([0.5, 1]);
      expect(math.scaleToFit(0, [1, 2], [1, 2])).to.almost.eql([1, 2]);
      expect(math.scaleToFit(Math.PI / 2, [1, 2], [1, 2])).to.almost.eql([0.5, 1]);
      expect(math.scaleToFit(Math.PI / 4, [1, 1], [1, 1]))
        .to.almost.eql([Math.sqrt(2) / 2, Math.sqrt(2) / 2]);
    });
  });
});
