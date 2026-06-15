// Function to be tested by 6-payment_token.test.js

const getPaymentTokenFromAPI = (success) => {
  if (success) {
    return new Promise ((resolve, reject) => {
      resolve({data: 'Successful response from the API' });
    });
  }
}

module.exports = getPaymentTokenFromAPI;
