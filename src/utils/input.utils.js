const path = require('path');
const fileUtils = require('./file.utils');

/**
 * Validates the data paths which are passed as arguments
 *  argArray is expected to be of size 2 with first record being the path of customer data
 *    and second is the path to the circle definition
 * @param {*} argArray 
 */
function getValidatedDataInput(argArray) {

  const circleDataPath = argArray[1]
    ? path.resolve(argArray[1])
    : path.resolve(__dirname, '../../data/default-circle.json');

  if (!fileUtils.isReadablePathSync(circleDataPath)) {
    throw new Error('Invalid path provided for the circle details');
  }

  const customerDataPath = argArray[0]
    ? path.resolve(argArray[0])
    : path.resolve(__dirname, '../../data/customers.txt');

  if (!fileUtils.isReadablePathSync(customerDataPath)) {
    throw new Error('Invalid path provided for the customer details');
  }

  return {
    circleDataPath,
    customerDataPath
  }
}

module.exports = {
  getValidatedDataInput
}