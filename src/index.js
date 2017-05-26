import { loadImage, getCanvas, scaleImageToFit } from './canvasMethods/canvasMethods';

const cropRotate = (src, divId) => loadImage(src).then((image) => {
  const canvas = getCanvas(divId);
  const context = canvas.getContext('2d');
  const angle = Math.PI / 4;
  const scaledImageDims = scaleImageToFit(angle, canvas, image);

  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(angle);
  context.drawImage(
    image,
    ...scaledImageDims.map(dim => -dim / 2),
    ...scaledImageDims,
  );
});

export default cropRotate;
