const fs = require('fs');
const readLine = require('readline');
const geometryUtils = require('../utils/geometry.utils');
const fileUtils = require('../utils/file.utils');

function processCustomersFromDataPath(customerDataPath, processCustomerIterator) {

  if (!fileUtils.isReadablePathSync(customerDataPath)) {
    throw new Error(`Unable to read customer data from ${customerDataPath}`);
  }

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
  try {
    const fileContents = fs.readFileSync(circleDataPath);
    return JSON.parse(fileContents);
  }
  catch (error) {
    throw new Error(`Error while reading circle details file from ${circleDataPath}`);
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
      throw new Error(`Invalid Geolocation for customer in ${recordString}`);
    }

    if (!customer.user_id && !customer.name) {
      throw new Error(`Incomplete details for customer in ${recordString}`)
    }

    return customer;

  } catch (error) {
    throw new Error(`Error parsing customer record into JSON object: \n${recordString}`);
  }
}

module.exports = {
  processCustomersFromDataPath,
  readCircleDataSync,
  parseCustomerRecord
}