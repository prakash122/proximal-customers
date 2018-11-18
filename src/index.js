const commonLib = require('./libs/common.lib');
const inputUtils = require('./utils/input.utils');
const geometryUtils = require('./utils/geometry.utils');
const fileUtils = require('./utils/file.utils');

/**   
 * Save the customers to be invited to a file
 * Also log them to the console
 * @param {*} invitedCustomers 
 */
function saveAndPrintCustomersTobeInvited(invitedCustomers) {

  const formattedCustomers = invitedCustomers
    .map(record => `${record.name} (${record.user_id})`)
    .join('\n');

  console.log(formattedCustomers);
  fileUtils.saveToFile(`output/${new Date().getTime()}_customers.txt`, formattedCustomers);
}

try {
  // We validate the paths and get the paths to the data files
  //  Command line arguments are passed to the function. 
  //  Currently, order of the arguments need to be maintained
  const { customerDataPath, circleDataPath } =
    inputUtils.getValidatedDataInput(process.argv.slice(2));

  // Reading the data from the input files
  const circleData = commonLib.readCircleDataSync(circleDataPath);
  const invitedCustomers = [];

  /**
    * Iterator function to process the customer records 
    * @param {*} customerRecordString 
    */
  function processCustomerIterator(customerRecordString) {

    const customer = commonLib.parseCustomerRecord(customerRecordString);
    if (!customer) {
      console.error(`Ignored the customer record may be because of incomplete or invalid details
    \n\t ${customerRecordString}`);
      return;
    }

    // Created an explicit variable as isInCircle wants to have only the customer geolocation
    const customerLocation = {
      latitude: customer.latitude,
      longitude: customer.longitude
    };

    // If the customer location is in the radius we chose  
    if (geometryUtils.isInCircle(circleData, customerLocation)) {
      invitedCustomers.push({
        user_id: customer.user_id,
        name: customer.name
      });
    }
  }

  // Read the customer data, process with the iterator and sort the results 
  //  along with saving the details to a file
  commonLib.processCustomersFromDataPath(customerDataPath, processCustomerIterator)

    .then(() => {
      const sortedCustomers = invitedCustomers.sort(function (a, b) {
        return a.user_id - b.user_id;
      });
      saveAndPrintCustomersTobeInvited(sortedCustomers)
    })

    .catch(error => {
      console.error(error.message || error);
    })
}
catch (error) {
  console.error(error.message || error);
  process.exit(1);
}
