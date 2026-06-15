const getPaymentTokenFromAPI = require('./6-payment_token');
const chai = require('chai');

describe ('Test suite', () => {
  it('Test that getPaymentTokenFromAPI resolves promise', (done) => {
    getPaymentTokenFromAPI(true)
      .then(response => {
        chai.expect(response.data).to.equal('Successful response from the API');
        done();
      });
  });
});
