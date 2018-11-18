
const commonUtils = require('./utils/common.utils');
const inputUtils = require('./utils/input.utils');
const geometryUtils = require('./utils/geometry.utils');

// We validate the paths and get the paths to the data files
const { customerDataPath, circleDataPath } = inputUtils.getValidatedDataInput();

const circleData = commonUtils.readCircleDataSync(circleDataPath);

const customerDataStream = commonUtils.getCustomerDataReadStream(customerDataPath);

const invitedCustomers = [];
customerDataStream.on('line', function (line) {
  const customer = JSON.parse(line);
  const customerLocation = {
    latitude: customer.latitude,
    longitude: customer.longitude
  };

  if (geometryUtils.isInCircle(circleData, customerLocation)) {
    invitedCustomers.push({
      user_id: customer.user_id,
      name: customer.name
    });
  }
});

customerDataStream.on('close', function () {
  const sortedCustomers = invitedCustomers.sort(function (a, b) {
    return a.user_id - b.user_id;
  });
  sortedCustomers.forEach(record => console.log(`${record.name} (${record.user_id})`));
})

