import { drawImage, drawCropRect } from './draw';
import { getCanvas, loadImage } from '../canvas/canvas';

describe('(Library) draw', () => {
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

      drawCropRect(state, {});

      canvasWrap.context.clearRect.should.have.been.calledWith(...rect);
    });
  });
});
