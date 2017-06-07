import { scale, scaleToFit } from '../math/math';

/**
 * A valid HTMLCanvas fill style.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
 * @typedef {(string|CanvasGradient|CanvasPattern)} CanvasStyle
 */

/**
 * @typedef  {Object} StyleOptions
 * @property {CanvasStyle} [backdropFill = 'rgba(33, 33, 33, 0.7)'] Fill style for excluded regions of the canvas
 * @property {CanvasStyle} [cropAreaFill = null]                    Fill style for the cropped areas of the canvas
 * @property {CanvasStyle} [borderStyle = '#fff']                   Crop border strokeStyle
 * @property {number}      [borderWidth = 2]                        Crop border lineWidth
 */

const DEFAULT_STYLES = {
  backdropFill: 'rgba(33, 33, 33, 0.7)',
  cropFill: null,
  borderStyle: '#fff',
  borderWidth: 2,
};

const ELEMENT_NOT_FOUND_MESSAGE = 'Referenced element not found';
const NOT_CANVAS_MESSAGE = 'Referenced element is not a canvas';
const IMAGE_ERROR_MESSAGE = 'Image not found';

export const isCanvas = element => (element instanceof HTMLCanvasElement);

export const getDimensions = ({ width, height }) => [width, height];

export const wrapCanvas = (canvas) => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  return {
    canvas,
    dimensions: getDimensions(canvas),
    context: canvas.getContext('2d'),
  };
};

export const wrapImage = image => ({
  image,
  dimensions: getDimensions(image),
});

export const getCanvas = (divId) => {
  const canvas = document.getElementById(divId);

  if (!canvas) throw new Error(ELEMENT_NOT_FOUND_MESSAGE);
  if (!isCanvas(canvas)) throw new Error(NOT_CANVAS_MESSAGE);

  return wrapCanvas(canvas);
};

export const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(wrapImage(image));
  image.onerror = () => reject(new Error(IMAGE_ERROR_MESSAGE));
  image.src = src;
});

const innerDrawImage = (context, image, angle, size, canvasDims) => {
  context.save();
  context.translate(...scale(canvasDims, 0.5));
  context.rotate(angle);
  context.drawImage(
    image,
    ...scale(size, -0.5),
    ...size,
  );
  context.restore();
};

export const drawImage = ({
  angle,
  imageWrap: { dimensions, image },
  canvasWrap: { context, dimensions: canvasDims },
}) => innerDrawImage(
  context,
  image,
  angle,
  scaleToFit(angle, canvasDims, dimensions),
  canvasDims,
);

const drawBackDrop = (context, canvasDims, { backdropFill }) => {
  context.fillStyle = backdropFill;
  context.fillRect(0, 0, ...canvasDims);
};

const fillRect = (context, rect, fill) => {
  if (fill) {
    context.fillStle = fill;
    context.fillRect(...rect);
  }
};

const strokeRect = (context, rect, style, width) => {
  if (width) {
    context.strokeStyle = style;
    context.lineWidth = width;
    context.strokeRect(...rect);
  }
};

const drawCropArea = (context, cropRect, { cropFill, borderStyle, borderWidth }) => {
  context.clearRect(...cropRect);
  fillRect(context, cropRect, cropFill);
  strokeRect(context, cropRect, borderStyle, borderWidth);
};

const innerDrawCropRect = (context, canvasDims, cropRect, styleOptions) => {
  context.globalCompositeOperation = 'destination-over';
  drawBackDrop(context, canvasDims, styleOptions);
  drawCropArea(context, cropRect, styleOptions);
};

export const drawCropRect = ({
  canvasWrap: { context, dimensions },
  cropRect,
}, styleOptions = DEFAULT_STYLES) => innerDrawCropRect(
  context,
  dimensions,
  cropRect,
  styleOptions,
);
