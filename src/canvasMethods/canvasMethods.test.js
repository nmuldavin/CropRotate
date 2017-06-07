import { loadImage, getCanvas, drawImage, drawCropRect } from './canvasMethods';

describe('(Library) canvasMethods', () => {
  describe('(Function) loadImage', () => {
    const imageUrl = 'someUrl';

    it('should return a promise that resolves with an object containging an Html5 Image object', () =>
      loadImage(imageUrl).then(imageWrap => imageWrap.image)
        .should.eventually.be.an.instanceOf(Image),
    );

    it('should set the provided sourceUrl on the image', () =>
      loadImage(imageUrl).then(imageWrap => imageWrap.image)
        .should.eventually.have.property('src', imageUrl),
    );

    it('should reject when the image can\'t be loaded', () =>
      loadImage().should.be.rejectedWith(Error),
    );
  });

  describe('(Function) getCanvas', () => {
    it('should return an object containing the canvas element referenced by the provided id', () => {
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

  describe('(Function) drawImage', () => {
    it('should call context.drawImage', () => loadImage('src').then((imageWrap) => {
      const canvasWrap = getCanvas('test-canvas');

      canvasWrap.context.drawImage = sinon.spy();

      const state = {
        imageWrap,
        canvasWrap: getCanvas('test-canvas'),
        angle: 0,
      };

      drawImage(state);

      canvasWrap.context.drawImage.should.have.been.called;
    }));
  });

  describe('(Function) drawCropRect', () => {
    it('should call context.clearRect with specified rect', () => {
      const canvasWrap = getCanvas('test-canvas');

      canvasWrap.context.clearRect = sinon.spy();

      const rect = [0, 0, 400, 400];

      const state = {
        canvasWrap: getCanvas('test-canvas'),
        cropRect: rect,
      };

      drawCropRect(state);

      canvasWrap.context.strokeRect.should.have.been.calledWith(...rect);
    });
  });
});
