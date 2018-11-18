const fs = require('fs');
const readLine = require('readline');

function getCustomerDataReadStream(customerDataPath) {
  return readLine.createInterface({
    input: fs.createReadStream(customerDataPath)
  });
}

function readCircleDataSync(circleDataPath) {

  // The file contents are expected to be in JSON format
  const fileContents = fs.readFileSync(circleDataPath);

  try {
    return JSON.parse(fileContents);
  }
  catch (error) {
    console.error('Expected JSON content in the circle details file', circleDataPath);
  }
}

module.exports = {
  getCustomerDataReadStream,
  readCircleDataSync
}