const path = require('path');
const fileUtils = require('./file.utils');

/**
 * Validates the data paths which are passed as arguments
 * Sample args will look like
 *  [
 *       'customer=./data/customers.txt',
 *       'circle-definition=./data/default-circle.json'
 *  ];
 * @param {*} argArray 
 */
function getValidatedDataInput(argArray) {

  argArray = argArray || [];

  let circleDataPath = path.resolve(__dirname, '../../data/default-circle.json');
  let customerDataPath = path.resolve(__dirname, '../../data/customers.txt');

  argArray.forEach(arg => {
    const splits = arg.split('=');
    switch (splits[0]) {
      case 'customer':
        customerDataPath = splits.slice(1).join('');
        break;
      case 'circle-definition':
        circleDataPath = splits.slice(1).join('')
        break;
    }
  });

  if (!fileUtils.isReadablePathSync(circleDataPath)) {
    throw new Error('Invalid path provided for the circle details');
  }

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