import { loadImage, getCanvas } from './canvasMethods/canvasMethods';

const cropRotate = (src, divId) => loadImage(src).then((image) => {
  const canvas = getCanvas(divId);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
});

export default cropRotate;
