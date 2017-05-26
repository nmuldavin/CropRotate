import { findScaleToFitAtAngle } from '../math/math';

const isCanvas = element => (element instanceof HTMLCanvasElement);

const getDimensions = ({ width, height }) => [width, height];

export const getCanvas = (divId) => {
  const canvas = document.getElementById(divId);

  if (!canvas) throw new Error('Referenced element not found');
  if (!isCanvas(canvas)) throw new Error('Referenced element is not a canvas');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  return canvas;
};

export const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('Image not found'));
  image.src = src;
});

export const scaleImageToFit = (angle, canvas, image) => {
  const imageDims = getDimensions(image);
  const scale = findScaleToFitAtAngle(angle, getDimensions(canvas), imageDims);
  return imageDims.map(dim => dim * scale);
};
