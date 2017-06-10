import { scale, scaleToFit } from '../math/math';

const drawBackDrop = (context, canvasDims, { backdropFill }) => {
  if (backdropFill) {
    context.fillStyle = backdropFill;
    context.fillRect(0, 0, ...canvasDims);
  }
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

export const drawCropRect = ({
  canvasWrap: { context, dimensions },
  cropRect,
}, styleOptions) => innerDrawCropRect(
  context,
  dimensions,
  cropRect,
  styleOptions,
);
