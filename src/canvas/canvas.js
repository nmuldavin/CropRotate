const ELEMENT_NOT_FOUND_MESSAGE = 'Referenced element not found';
const NOT_CANVAS_MESSAGE = 'Referenced element is not a canvas';
const IMAGE_ERROR_MESSAGE = 'Image not found';

const isCanvas = element => (element instanceof HTMLCanvasElement);

const getDimensions = ({ width, height }) => [width, height];

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
