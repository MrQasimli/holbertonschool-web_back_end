// App to be tested by api.test.js
const express = require('express');

const app = express();

app
  .get('/', (req, res) => {
    res.send('Welcome to the payment system');
  })
  .listen(7865, () => {
    console.log('Server is listening on port 7865');
  });

module.exports = app;
