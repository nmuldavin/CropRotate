'use strict';

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Library Index', function () {
  it('should export something', function () {
    expect(_2.default).to.exist;
  });
});

describe('(Function) loadImage', function () {
  var imageUrl = 'someUrl';
  it('should return a promise that resolves with an Html5 Image object', function () {
    return (0, _.loadImage)(imageUrl).should.eventually.be.an.instanceOf(Image);
  });

  it('should return an image with the provided sourceUrl', function () {
    return (0, _.loadImage)(imageUrl).should.eventually.have.property('src', imageUrl);
  });

  it('should reject when the image can\'t be loaded', function () {
    return (0, _.loadImage)().should.be.rejectedWith(Error);
  });
});