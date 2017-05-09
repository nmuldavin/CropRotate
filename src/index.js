export const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image();

  // eslint-disable-next-line
  Object.assign(image, {
    src,
    onload() {
      resolve(image);
    },
    onerror() {
      reject(new Error('Image not found'));
    },
  });
});

const isCanvas = element => (element instanceof HTMLCanvasElement);

const getCanvas = (divId) => {
  const canvas = document.getElementById(divId);

  if (!canvas) throw new Error('Referenced element not found');
  if (!isCanvas) throw new Error('Referenced element is not a canvas');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  console.dir(canvas);
  return canvas;
};

const cropRotate = (src, divId) => loadImage(src).then((image) => {
  const canvas = getCanvas(divId);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
});

export default cropRotate;
