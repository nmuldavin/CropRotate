import { drawImage, drawCropRect } from './draw';
import { getCanvas, loadImage } from '../canvas/canvas';

describe('(Library) draw', () => {
  describe('(Function) drawImage', () => {
    it('should pass the appropriate image to context.drawImage', () => loadImage('src').then((imageWrap) => {
      const canvasWrap = getCanvas('test-canvas');

      canvasWrap.context.drawImage = sinon.spy();

      const state = {
        imageWrap,
        canvasWrap: getCanvas('test-canvas'),
        angle: 0,
      };

      drawImage(state);

      expect(canvasWrap.context.drawImage.args[0][0]).to.eql(imageWrap.image);
    }));
  });

  describe('(Function) drawCropRect', () => {
    const cropRect = [0, 0, 400, 400];

    let canvasWrap;
    let fillStyle;
    let fillRectSpy;
    let state;

    const spyAndNoteFillStyle = (...args) => {
      fillRectSpy(...args);
      fillStyle = canvasWrap.context.fillStyle;
    };

    beforeEach(() => {
      fillRectSpy = sinon.spy();
      canvasWrap = getCanvas('test-canvas');
      canvasWrap.context.strokeRect = sinon.spy();
      fillStyle = null;
      state = {
        canvasWrap,
        cropRect,
      };
    });

    it('should fill the entire canvas with the specified backdrop fill if specified', () => {
      const backdropFill = '#ffffff';

      canvasWrap.context.fillRect = spyAndNoteFillStyle;

      drawCropRect(state, { backdropFill });

      expect(fillStyle).to.eql(backdropFill);
      expect(fillRectSpy).to.have.been.calledWith(0, 0, ...canvasWrap.dimensions);
    });

    it('should not fill the canvas if no backdropFill is specified', () => {
      drawCropRect(state, {});

      expect(fillRectSpy).to.not.have.been.calledWith(0, 0, ...canvasWrap.dimensions);
    });

    it('should fill the crop rect with the specified backdrop if specified', () => {
      const cropFill = '#ffffff';

      canvasWrap.context.fillRect = spyAndNoteFillStyle;

      drawCropRect(state, { cropFill });

      expect(fillStyle).to.eql(cropFill);
      expect(fillRectSpy).to.have.been.calledWith(...state.cropRect);
    });

    it('should not fill the crop area if no cropFill is specified', () => {
      drawCropRect(state, {});

      expect(fillRectSpy).to.not.have.been.calledWith(...state.cropRect);
    });

    it('should fill the crop rect with the specified backdrop if specified', () => {
      const cropFill = '#ffffff';

      canvasWrap.context.fillRect = spyAndNoteFillStyle;

      drawCropRect(state, { cropFill });

      expect(fillStyle).to.eql(cropFill);
      expect(fillRectSpy).to.have.been.calledWith(...state.cropRect);
    });

    it('should not fill the crop area if no cropFill is specified', () => {
      drawCropRect(state, {});

      expect(fillRectSpy).to.not.have.been.calledWith(...state.cropRect);
    });

    it('should stroke the border of the crop Rect with the correct lineWidth and fillStyle if lineWidth is specified', () => {
      const borderStyle = '#ffffff';
      const borderWidth = 1;

      canvasWrap.context.fillRect = spyAndNoteFillStyle;

      drawCropRect(state, { borderStyle, borderWidth });

      expect(canvasWrap.context.strokeStyle).to.eql(borderStyle);
      expect(canvasWrap.context.strokeRect).to.have.been.calledWith(...state.cropRect);
    });

    it('should not stroke the border of the cropRect if lineWidth is not specified', () => {
      drawCropRect(state, {});

      canvasWrap.context.strokeRect.should.not.have.been.calledWith(...state.cropRect);
    });
  });
});
