const path = require('path');
const commonLib = require('../src/libs/common.lib');

describe('Parse Circle definition', () => {

  test('Reading Circle definition on right path', () => {
    const circleDataPath = path.resolve(__dirname, '../data/default-circle.json');
    const expectedCircleDefinition = require(circleDataPath);

    const actualCircleDefinition = commonLib.readCircleDataSync(circleDataPath);
    expect(JSON.stringify(actualCircleDefinition))
      .toBe(JSON.stringify(expectedCircleDefinition));
  })

  test('Throw error on wrong path while reading circle definition', () => {
    const wrongCircleDataPath = path.resolve(__dirname, '../data/wrong-path.json');
    expect(() =>
      commonLib.readCircleDataSync(wrongCircleDataPath)).toThrowError();
  })
})