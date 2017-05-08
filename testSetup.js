/* eslint-disable */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

chai.should();
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;

const { window } = new JSDOM('');
const { document } = window;
global.window = window;
global.document = document;
