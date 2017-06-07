import { loadImage, getCanvas, drawImage, drawCropRect } from './canvas/canvas';

/**
 * @typedef CanvasState
 * @param  {number} angle   [description]
 * @param  {ImageWrap} imageWrap [description]
 * @param  {CanvasWrap} canvasWrap [description]
 * @param  {number[]} cropRect
 * @return {[type]}       [description]
 */

const cropRotate = (src, divId) => loadImage(src).then((imageWrap) => {
  const canvasWrap = getCanvas(divId);
  const state = {
    angle: Math.PI / 4,
    imageWrap,
    canvasWrap,
    cropRect: [400, 100, 300, 300],
  };
  drawCropRect(state);
  drawImage(state);
});

export default cropRotate;
