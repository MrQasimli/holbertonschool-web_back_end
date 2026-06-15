const calculateNumber = require('./2-calcul_chai');
const chai = require('chai');
const expect = chai.expect;

describe ('Test suite', () => {
  // Tests for calculateNumber function using Chai expect
  it('Test that calculateNumber sums two rounded numbers', () => {
    expect(calculateNumber('SUM', 1, 2)).to.be.eq(3);
    expect(calculateNumber('SUM', 1.1, 2.1)).to.be.eq(3);
    expect(calculateNumber('SUM', 1.4, 2.4)).to.be.eq(3);
    expect(calculateNumber('SUM', 1.9, 2.9)).to.be.eq(5);
    expect(calculateNumber('SUM', 1.5, .5)).to.be.eq(3);
    expect(calculateNumber('SUM', 2, 0)).to.be.eq(2);
    expect(calculateNumber('SUM', -7, 2.1)).to.be.eq(-5);
    expect(calculateNumber('SUM', 8.4, -3)).to.be.eq(5);
    expect(calculateNumber('SUM', -10.9, -3.6)).to.be.eq(-15);
  });

  it('Test that calculateNumber subtracts two rounded numbers', () => {
    expect(calculateNumber('SUBTRACT', 1, 2)).to.be.eq(-1);
    expect(calculateNumber('SUBTRACT', 2, 1)).to.be.eq(1);
    expect(calculateNumber('SUBTRACT', 3.4, 3.1)).to.be.eq(0);
    expect(calculateNumber('SUBTRACT', 1.1, 2.3)).to.be.eq(-1);
    expect(calculateNumber('SUBTRACT', 6.4, 3.8)).to.be.eq(2);
    expect(calculateNumber('SUBTRACT', -7, -2.9)).to.be.eq(-4);
    expect(calculateNumber('SUBTRACT', 1.5, -2.5)).to.be.eq(4);
    expect(calculateNumber('SUBTRACT', 0, 2.8)).to.be.eq(-3);
    expect(calculateNumber('SUBTRACT', 0, -3)).to.be.eq(3);
  });

  it('Test that calculateNumber divides two rounded numbers', () => {
    expect(calculateNumber('DIVIDE', 1, 2)).to.be.eq(.5);
    expect(calculateNumber('DIVIDE', 2, 1)).to.be.eq(2);
    expect(calculateNumber('DIVIDE', 1.4, 2.4)).to.be.eq(0.5);
    expect(calculateNumber('DIVIDE', 2.9, 1.4)).to.be.eq(3);
    expect(calculateNumber('DIVIDE', -10, 2.3)).to.be.eq(-5);
    expect(calculateNumber('DIVIDE', -9, -2.9)).to.be.eq(3);
    expect(calculateNumber('DIVIDE', 1.5, -3.8)).to.be.eq(-.5);
    expect(calculateNumber('DIVIDE', 0.25, 2.5)).to.be.eq(0);
    expect(calculateNumber('DIVIDE', 0.1, -12.5)).to.be.eq(0);
  });

  it('Test that calculateNumber returns error', () => {
    expect(calculateNumber('sum', 1, 2)).to.be.eq('Error');
    expect(calculateNumber('MULTIPLY', 1, 2)).to.be.eq('Error');
    expect(calculateNumber('DIVIDE', 5, 0)).to.be.eq('Error');
    expect(calculateNumber('DIVIDE', -5, 0.4)).to.be.eq('Error');
    expect(calculateNumber(1, 2)).to.be.eq('Error');
  });
})
