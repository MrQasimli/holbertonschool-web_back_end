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

  it('Test that /available_payments returns json object', (done) => {
    request('http://localhost:7865/available_payments', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.request.method).to.be.equal('GET');
      expect(body).to.deep.equal(JSON.stringify({
        payment_methods: {
          credit_cards: true,
          paypal: false
        }
      }));
      done();
    });
  });

  it('Test that /login POST returns correct status code and message', (done) => {
    request.post('http://localhost:7865/login', {
      json: {
        userName: 'test'
      }
    }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome test');
      expect(response.request.method).to.be.equal('POST');
      done();
    });
  });

});
