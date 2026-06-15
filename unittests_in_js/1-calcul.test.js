const calculateNumber = require('./1-calcul');
const assert = require('assert');

describe ('Test suite', () => {
  // Tests for calculateNumber function using Node.js assert
  it('Test that calculateNumber sums two rounded numbers', () => {
    assert.equal(calculateNumber('SUM', 1, 2), 3);
    assert.equal(calculateNumber('SUM', 1.1, 2.1), 3);
    assert.equal(calculateNumber('SUM', 1.4, 2.4), 3);
    assert.equal(calculateNumber('SUM', 1.9, 2.9), 5);
    assert.equal(calculateNumber('SUM', 1.5, .5), 3);
    assert.equal(calculateNumber('SUM', 2, 0), 2);
    assert.equal(calculateNumber('SUM', -7, 2.1), -5);
    assert.equal(calculateNumber('SUM', 8.4, -3), 5);
    assert.equal(calculateNumber('SUM', -10.9, -3.6), -15);
  });

  it('Test that calculateNumber subtracts two rounded numbers', () => {
    assert.equal(calculateNumber('SUBTRACT', 1, 2), -1);
    assert.equal(calculateNumber('SUBTRACT', 2, 1), 1);
    assert.equal(calculateNumber('SUBTRACT', 3.4, 3.1), 0);
    assert.equal(calculateNumber('SUBTRACT', 1.1, 2.3), -1);
    assert.equal(calculateNumber('SUBTRACT', 6.4, 3.8), 2);
    assert.equal(calculateNumber('SUBTRACT', -7, -2.9), -4);
    assert.equal(calculateNumber('SUBTRACT', 1.5, -2.5), 4);
    assert.equal(calculateNumber('SUBTRACT', 0, 2.8), -3);
    assert.equal(calculateNumber('SUBTRACT', 0, -3), 3);
  });

  it('Test that calculateNumber divides two rounded numbers', () => {
    assert.equal(calculateNumber('DIVIDE', 1, 2), .5);
    assert.equal(calculateNumber('DIVIDE', 2, 1), 2);
    assert.equal(calculateNumber('DIVIDE', 1.4, 2.4), 0.5);
    assert.equal(calculateNumber('DIVIDE', 2.9, 1.4), 3);
    assert.equal(calculateNumber('DIVIDE', -10, 2.3), -5);
    assert.equal(calculateNumber('DIVIDE', -9, -2.9), 3);
    assert.equal(calculateNumber('DIVIDE', 1.5, -3.8), -0.5);
    assert.equal(calculateNumber('DIVIDE', 0.25, 2.5), 0);
    assert.equal(calculateNumber('DIVIDE', -0.003, -12.5), 0);
  });

  it('Test that calculateNumber returns error', () => {
    assert.equal(calculateNumber('sum', 1, 2), 'Error');
    assert.equal(calculateNumber('MULTIPLY', 1, 2), 'Error');
    assert.equal(calculateNumber('DIVIDE', 5, 0), 'Error');
    assert.equal(calculateNumber('DIVIDE', -5.1, 0.4), 'Error');
    assert.equal(calculateNumber(1, 2), 'Error');
  });
})
