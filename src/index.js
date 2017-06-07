import { loadImage, getCanvas, drawImage, drawCropRect } from './canvasMethods/canvasMethods';

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
  };
  drawCropRect(state.canvasWrap.context, state.canvasWrap.dimensions, [200, 200, 400, 400]);
  drawImage(state);
});

export default cropRotate;
