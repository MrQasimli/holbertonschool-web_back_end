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
});
