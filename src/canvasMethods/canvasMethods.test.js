import { loadImage, getCanvas } from './canvasMethods';

describe('(Library) canvasMethods', () => {
  describe('(Function) loadImage', () => {
    const imageUrl = 'someUrl';
    it('should return a promise that resolves with an Html5 Image object', () =>
      loadImage(imageUrl)
      .then(imageWrap => imageWrap.image).should.eventually.be.an.instanceOf(Image),
    );

    it('should return an image with the provided sourceUrl', () =>
      loadImage(imageUrl)
      .then(imageWrap => imageWrap.image).should.eventually.have.property('src', imageUrl),
    );

    it('should reject when the image can\'t be loaded', () =>
      loadImage().should.be.rejectedWith(Error),
    );
  });

  describe('(Function) getCanvas', () => {
    it('should return the canvas element referenced by the provided id', () => {
      const { canvas } = getCanvas('test-canvas');

      canvas.should.be.an.instanceOf(HTMLCanvasElement);
    });

    it('should throw an error if the element is not found', () => {
      expect(() => getCanvas('lalalala')).to.throw('Referenced element not found');
    });

    it('should throw an error if the element is not a canvas', () => {
      expect(() => getCanvas('otherthing')).to.throw('Referenced element is not a canvas');
    });
  });
});
