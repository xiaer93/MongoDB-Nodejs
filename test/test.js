/**
 * Created by xiaer on 2018/8/19.
 */
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(sinonChai)

describe('Mocha Test', function () {
    it('canary test', function () {
        expect(true).to.be.true
    })
})