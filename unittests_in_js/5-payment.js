// Function to be tested by 5-payment.test.js
const Utils = require("./utils");

const sendPaymentRequestToApi = (totalAmount, totalShipping) => {
  // Uses Utils.calculateNumber to calculate total amount of order
  const result = Utils.calculateNumber("SUM", totalAmount, totalShipping);
  console.log(`The total is: ${result}`);
}

module.exports = sendPaymentRequestToApi;
