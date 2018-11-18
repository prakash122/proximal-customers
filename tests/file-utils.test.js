const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const fileUtils = require('../src/utils/file.utils');

describe('Is a file readable from its path', () => {
  test('file is not found in the path', () => {
    const customersPath = path.resolve(__dirname, '../data/customers.txt');
    expect(fileUtils.isReadablePathSync(customersPath)).toBe(true);
  });

  test('file is found in the given path', () => {
    const wrongCustomerPath = '../data/wrong-path.txt';
    expect(fileUtils.isReadablePathSync(wrongCustomerPath)).toBe(false);
  });
});

describe('Saving a file ', () => {
  const dirPath = path.resolve(__dirname, './test-output');

  // Before & After the test we clear the directory
  beforeEach(done => rimraf(dirPath, done));
  afterEach(done => rimraf(dirPath, done));

  test('Saving a file with valid details', (done) => {

    const filePath = dirPath + '/test-created.txt';
    const fileContents = "Just some content";

    expect(fileUtils.isReadablePathSync(filePath)).toBe(false);
    fileUtils.saveToFile(filePath, fileContents, () => {
      expect(fileUtils.isReadablePathSync(filePath)).toBe(true);
      const actualContents = fs.readFileSync(filePath).toString();
      expect(actualContents).toBe(fileContents);
      done();
    })
  })

  test('Skip saving a file with invalid details', () => {
    const filePath = dirPath + '/test-created.txt';
    expect(() => fileUtils.saveToFile(filePath)).toThrowError();
  })
});
