'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadImage = exports.loadImage = function loadImage(src) {
  return new Promise(function (resolve, reject) {
    var image = new Image();

    Object.assign(image, {
      src: src,
      onload: function onload() {
        resolve(image);
      },
      onerror: function onerror() {
        reject(new Error('Image not found'));
      }
    });
  });
};

var isCanvas = function isCanvas(element) {
  return element instanceof HTMLCanvasElement;
};

var getCanvas = function getCanvas(divId) {
  var canvas = document.getElementById(divId);

  if (!canvas) throw new Error('Referenced element not found');
  if (!isCanvas) throw new Error('Referenced element is not a canvas');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  return canvas;
};

var cropRotate = function cropRotate(src, divId) {
  return loadImage(src).then(function (image) {
    var canvas = getCanvas(divId);
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  });
};

exports.default = cropRotate;