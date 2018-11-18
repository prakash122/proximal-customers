const path = require('path');
const commonLib = require('../src/libs/common.lib');

describe('Get customer data read stream', () => {

  test('Read all the records in customer file', (done) => {

    const customersPath = path.resolve(__dirname, '../data/customers.txt');
    let counter = 0;
    let expectedCount = 32;

    commonLib.processCustomersFromDataPath(customersPath, () => counter++)
      .then(() => {
        expect(counter).toBe(expectedCount);
        done()
      })
  });

  test('When the customer data path is wrong throw error', () => {

    const wrongCustomerPath = '../data/wrong-path.txt';
    expect(() =>
      commonLib.processCustomersFromDataPath(wrongCustomerPath)).toThrowError();
  });

})

describe('Parse customer record', () => {

  test('When a valid customer record string is passed', () => {
    const customerRecordString =
      `{"latitude": "52.986375", "user_id": 12, 
        "name": "Christina McArdle", "longitude": "-6.043701"}`;
    const customerRecord = commonLib.parseCustomerRecord(customerRecordString);
    const expectedCustomerRecord = JSON.parse(customerRecordString);

    expect(customerRecord.latitude).toBe(expectedCustomerRecord.latitude);
    expect(customerRecord.longitude).toBe(expectedCustomerRecord.longitude);
    expect(customerRecord.user_id).toBe(expectedCustomerRecord.user_id);
    expect(customerRecord.name).toBe(expectedCustomerRecord.name);
  })

  test('When a customer record string with invalid data is passed', () => {
    // Passing an invalid latitude
    const invalidCustomerRecordString =
      `{"latitude": "252.986375", "user_id": 12, 
    "name": "Christina McArdle", "longitude": "-6.043701"}`;
    expect(() => commonLib.parseCustomerRecord(invalidCustomerRecordString))
      .toThrowError();

  })

  test('When a customer record string with incomplete data is passed', () => {
    // Skipping customer name and user id from the string form
    const incompleteCustomerRecordString =
      `{"latitude": "52.986375", "longitude": "-6.043701"}`;
    expect(() => commonLib.parseCustomerRecord(incompleteCustomerRecordString))
      .toThrowError();
  })

})