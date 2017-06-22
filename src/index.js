import { loadImage, getCanvas } from './canvas/canvas';
import { drawImage, drawCropRect } from './draw/draw';

/**
 * A valid HTMLCanvas fill style.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
 * @typedef {(string|CanvasGradient|CanvasPattern)} CanvasStyle
 */

/**
 * @typedef  {Object} StyleOptions
 * @property {CanvasStyle}    [backdropFill = 'rgba(33, 33, 33, 0.7)'] Fill style for excluded regions of the canvas
 * @property {CanvasStyle}    [cropAreaFill = null]                    Fill style for the cropped areas of the canvas
 * @property {CanvasStyle}    [borderStyle = '#fff']                   Crop border strokeStyle
 * @property {number}         [borderWidth = 2]                        Crop border lineWidth
 * @property {number|string}  [gridLines = 2]                          Number of grid lines
 */

/**
 * @typedef CanvasState
 * @param  {number} angle   [description]
 * @param  {ImageWrap} imageWrap [description]
 * @param  {CanvasWrap} canvasWrap [description]
 * @param  {number[]} cropRect
 */

const DEFAULT_STYLES = {
  backdropFill: 'rgba(33, 33, 33, 0.7)',
  cropFill: null,
  borderStyle: '#fff',
  borderWidth: 2,
};

const cropRotate = (src, divId) => loadImage(src).then((imageWrap) => {
  const canvasWrap = getCanvas(divId);
  const state = {
    angle: Math.PI / 4,
    imageWrap,
    canvasWrap,
    cropRect: [400, 100, 300, 300],
  };
  drawCropRect(state, DEFAULT_STYLES);
  drawImage(state);
});

export default cropRotate;
