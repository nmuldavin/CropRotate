/* eslint-disable */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require("chai-as-promised");

require('jsdom-global')('<canvas id="test-canvas"></canvas><div id="otherthing"></div>');

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

global.expect = chai.expect;
global.sinon = sinon;

// Mocking Image class because jsdom's doesn't call onload
class Image {
  constructor() {
    setTimeout(() => {
      if (this.src) {
        this.onload();
      } else {
        this.onerror();
      }
    }, 100);
  }
}

global.Image = Image;
