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

const cropRotate = src => loadImage(src);

export default cropRotate;
