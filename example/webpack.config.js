// eslint-disable-next-line
const webpack = require('webpack');
const { resolve } = require('path');

const entry = './example/example.js';

module.exports = {
  entry,
  output: {
    path: resolve('./example'),
    filename: 'build.js',
  },
  devtool: 'eval-source-map',
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
