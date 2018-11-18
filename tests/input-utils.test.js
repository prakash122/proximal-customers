const path = require('path');
const inputUtils = require('../src/utils/input.utils');

describe('Process paths of input data', function () {

  test('When no paths are passed', () => {
    const { circleDataPath, customerDataPath } = inputUtils.getValidatedDataInput();
    expect(circleDataPath).toBe(path.resolve(__dirname, '../data/default-circle.json'));
    expect(customerDataPath).toBe(path.resolve(__dirname, '../data/customers.txt'));
  });

  test('When customer data & circle definition paths are provided', () => {

    const args = [
      'customer=./data/customers.txt',
      'circle-definition=./data/default-circle.json',
    ];
    const { circleDataPath, customerDataPath } = inputUtils.getValidatedDataInput(args);
    expect(circleDataPath).toBeDefined();
    expect(customerDataPath).toBeDefined();
  });

  test('when circle definition path is not existing throw error', () => {
    const args = [
      'customer=./data/wrong-path.txt'
    ];
    expect(() => inputUtils.getValidatedDataInput(args)).toThrowError();
  });
})