const sendPaymentRequestToApi = require('./5-payment');
const sinon = require('sinon');

describe ('Test suite', () => {

  let spy;
  beforeEach(() => {
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    spy.restore();
  });

  it('Test that sendPaymentRequestToApi logs for 120', () => {
    sendPaymentRequestToApi(100, 20);
    spy.calledWith('The total is: 120');
    spy.calledOnce;
  });

  it('Test that sendPaymentRequestToApi logs for 20', () => {
    sendPaymentRequestToApi(10, 10);
    spy.calledWith('The total is: 20');
    spy.calledOnce;
  });
});
