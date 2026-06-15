const { expect } = require('chai');
const request = require('request');

describe ('Test suite', () => {
  // Should stub request in actual test
  it('Test that GET returns correct status code and result', (done) => {
    request('http://localhost:7865/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to the payment system');
      expect(response.request.method).to.be.equal('GET');
      done();
    })
  });

  it('Test that /cart/:id works with number', (done) => {
    request('http://localhost:7865/cart/7', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Payment methods for cart 7');
      expect(response.request.method).to.be.equal('GET');
      done();
    })
  });

  it('Test that /cart/:id fails with non-number', (done) => {
    request('http://localhost:7865/cart/fail', (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      expect(response.request.method).to.be.equal('GET');
      done();
    })
  });
})
