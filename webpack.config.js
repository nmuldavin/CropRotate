// eslint-disable-next-line
const webpack = require('webpack');
const { resolve } = require('path');

const entry = './src/index.js';

module.exports = {
  entry: {
    cropRotate: entry,
    'cropRotate.min': entry,
  },
  output: {
    path: resolve('./dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
