const fs = require('fs');
const readLine = require('readline');
const geometryUtils = require('../utils/geometry.utils');

function processCustomersFromDataPath(customerDataPath, processCustomerIterator) {
  return new Promise((resolve, reject) => {
    const readStream = readLine.createInterface({
      input: fs.createReadStream(customerDataPath)
    })
    readStream.on('line', processCustomerIterator);
    readStream.on('close', resolve)
  });
}

function readCircleDataSync(circleDataPath) {

  // The file contents are expected to be in JSON format
  const fileContents = fs.readFileSync(circleDataPath);

  try {
    return JSON.parse(fileContents);
  }
  catch (error) {
    throw new Error(`Expected JSON content in the circle details file ${circleDataPath}`);
  }
}

/**
 * Parse a stringified customer record to an object 
 *  and verify if it is a valid customer record
 * @param {*} recordString 
 */
function parseCustomerRecord(recordString) {

  try {
    const customer = JSON.parse(recordString);

    const customerLocation = {
      latitude: customer.latitude,
      longitude: customer.longitude
    }

    // If the customer is not having any of the following attributes
    // we will not be able to invite him.
    if (!geometryUtils.isGeoLocationValid(customerLocation)) {
      console.error(`Invalid Geolocation for customer in ${recordString}`);
    } else if (customer.user_id || customer.name) {
      return customer;
    }

  } catch (error) {
    console.error('Error parsing customer record into JSON object:\n', recordString);
  }

  return null;
}

module.exports = {
  processCustomersFromDataPath,
  readCircleDataSync,
  parseCustomerRecord
}