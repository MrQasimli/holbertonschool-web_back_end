const sendPaymentRequestToApi = require('./4-payment');
const Utils = require('./utils');
const sinon = require('sinon');

describe ('Test suite', () => {
  it('Test that sendPaymentRequestToApi is same as Utils.calculateNumber SUM', () => {
    const spy = sinon.spy(Utils, 'calculateNumber');
    sendPaymentRequestToApi(100, 20);
    spy.calledWith('SUM', 100, 20);
    spy.restore();
  });

  it('Test that sendPaymentRequestToApi is logging to console correctly', () => {
    const stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    const spy = sinon.spy(console, 'log');
    sendPaymentRequestToApi(100, 20);
    stub.calledWith('SUM', 100, 20);
    spy.calledWith('The total is: 10');
    stub.returns(10);
    spy.restore();
    stub.restore();
  });
});
