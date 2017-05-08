import cropRotate, { loadImage } from '.';

describe('Library Index', () => {
  it('should export something', () => {
    expect(cropRotate).to.exist;
  });
});

describe('(Function) loadImage', () => {
  const imageUrl = 'someUrl';
  it('should return a promise that resolves with an Html5 Image object', () =>
    loadImage(imageUrl).should.eventually.be.an.instanceOf(Image),
  );

  it('should return an image with the provided sourceUrl', () =>
    loadImage(imageUrl).should.eventually.have.property('src', imageUrl),
  );

  it('should reject when the image can\'t be loaded', () =>
    loadImage().should.be.rejectedWith(Error),
  );
});
