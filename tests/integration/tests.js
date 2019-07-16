var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('calculator functionality', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:3000');
  });

  // write integration tests here in the form of "it should do something..."
  it('should have working number buttons', function(){
    running_total = element(by.css('#running_total'));
    element(by.css('#number2')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('2')
  });

  // number buttons update the display of the running total
  it('should update display of running total on number click', function() {
    running_total = element(by.css('#running_total'));
    element(by.css('#number2')).click();
    element(by.css('#number5')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('25');
  });

  // arithmetical operations update the display with the result of the operation
  it('should update display with result of operation', function() {
    running_total = element(by.css('#running_total'));
    element(by.css('#number2')).click();
    element(by.css('#operator_multiply')).click();
    element(by.css('#number5')).click();
    element(by.css('#operator_subtract')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('10');
  });

  // chain multiple operations together
  it('should update display with result of operation', function() {
    running_total = element(by.css('#running_total'));
    element(by.css('#number3')).click();
    element(by.css('#operator_multiply')).click();
    element(by.css('#number4')).click();
    element(by.css('#operator_subtract')).click();
    element(by.css('#number8')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('4');
  });

  // check output is as expected for range of numbers (positive, negative, decimal and very large numbers)
  // negative result
  it('should display expected number for results lower than 0', function() {
    running_total = element(by.css('#running_total'));
    element(by.css('#number2')).click();
    element(by.css('#operator_subtract')).click();
    element(by.css('#number8')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('-6');
  });

  // decimal result
  it('should display expected number for results with decimal point', function() {
    running_total = element(by.css('#running_total'));
    element(by.css('#number2')).click();
    element(by.css('#operator_divide')).click();
    element(by.css('#number8')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('0.25');
  });

  // large number in scientific notation result
  it('should display expected number for results that are large numbers', function() {
    running_total = element(by.css('#running_total'));
    element(by.css('#number9')).click();
    element(by.css('#number8')).click();
    element(by.css('#number3')).click();
    element(by.css('#number5')).click();
    element(by.css('#number6')).click();
    element(by.css('#number3')).click();
    element(by.css('#number8')).click();
    element(by.css('#number6')).click();
    element(by.css('#number9')).click();
    element(by.css('#number4')).click();
    element(by.css('#number3')).click();
    element(by.css('#operator_multiply')).click();
    element(by.css('#number8')).click();
    element(by.css('#number9')).click();
    element(by.css('#number1')).click();
    element(by.css('#number3')).click();
    element(by.css('#number2')).click();
    element(by.css('#number8')).click();
    element(by.css('#number6')).click();
    element(by.css('#number4')).click();
    element(by.css('#number5')).click();
    element(by.css('#number9')).click();
    element(by.css('#number9')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('8.76678651983727e+21');
  });

  // number divided by zero displays 'Not a number'
  it('should display "Not a number" when divided by zero', function() {
    running_total = element(by.css('#running_total'));
    element(by.css('#number5')).click();
    element(by.css('#operator_divide')).click();
    element(by.css('#number0')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('Not a number');
  });

});
