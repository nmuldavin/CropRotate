import { scale, scaleToFit } from '../math/math';

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

  if (!canvas) throw new Error('Referenced element not found');
  if (!isCanvas(canvas)) throw new Error('Referenced element is not a canvas');

  return wrapCanvas(canvas);
};

export const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(wrapImage(image));
  image.onerror = () => reject(new Error('Image not found'));
  image.src = src;
});

const drawImageAtAngle = (context, image, angle, size, canvasDims) => {
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
}) => drawImageAtAngle(
  context,
  image,
  angle,
  scaleToFit(angle, canvasDims, dimensions),
  canvasDims,
);
