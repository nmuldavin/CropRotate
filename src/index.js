export const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('Image not found'));
  image.src = src;
});

const isCanvas = element => (element instanceof HTMLCanvasElement);

const getCanvas = (divId) => {
  const canvas = document.getElementById(divId);

  if (!canvas) throw new Error('Referenced element not found');
  if (!isCanvas(canvas)) throw new Error('Referenced element is not a canvas');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  return canvas;
};

const cropRotate = (src, divId) => loadImage(src).then((image) => {
  const canvas = getCanvas(divId);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
});

export default cropRotate;
