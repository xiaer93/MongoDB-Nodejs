/**
 * Created by xiaer on 2018/8/19.
 */
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(sinonChai)

var home = require('../../src/controllers/home'),
    image = require('../../src/controllers/image'),
    routes = require('../../src/server/routes');

