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

const drawLine = (context, xi, yi, xf, yf) => {
  context.beginPath();
  context.moveTo(xi, yi);
  context.lineTo(xf, yf);
  context.stroke();
};

const getXBounds = ([l,, w]) => [l, l + w];

const getYBounds = ([, t,, h]) => [t, t + h];

const drawHorizontalLine = (context, y, xi, xf) => drawLine(context, xi, y, xf, y);

const drawVerticalLine = (context, x, yi, yf) => drawLine(context, x, yi, x, yf);

const calculateGridlinePositions = (i, f, numLines) => {
  const spacing = f - i;
  const base = new Array(numLines);
  return base.map((_, index) => i + (spacing * index));
};

const drawGrid = (context, cropRect, { gridLines }) => {
  const horizontalPositions = calculateGridlinePositions(...getYBounds(cropRect), gridLines);
  const verticalPositions = calculateGridlinePositions(...getXBounds(cropRect), gridLines);
  calculateGridlinePositions(...getXBounds(cropRect), gridLines)
    .forEach(gridPosition => drawVerticalLine(context, gridPosition, ...getYBounds(cropRect)));
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
