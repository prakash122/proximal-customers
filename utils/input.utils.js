const path = require('path');
const fileUtils = require('./file.utils');

function getValidatedDataInput() {

  const circleDataPath = process.argv[3]
    ? path.resolve(process.argv)
    : path.resolve(__dirname, '../data/default-circle.json');

  if (!fileUtils.isReadablePath(circleDataPath, true)) {
    console.error('Invalid path provided for the circle details');
    process.exit(1);
  }

  const customerDataPath = process.argv[2]
    ? path.resolve(process.argv)
    : path.resolve(__dirname, '../data/customers.txt');

  if (!fileUtils.isReadablePath(customerDataPath, true)) {
    console.error('Invalid path provided for the customer details');
    process.exit(1);
  }

  return {
    circleDataPath,
    customerDataPath
  }
}

module.exports = {
  getValidatedDataInput
}