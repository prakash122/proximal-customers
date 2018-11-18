const geometryUtils = require('../src/utils/geometry.utils');

test('Length of a longitude', () => {

  const northPole = {
    latitude: 90,
    longitude: 1
  }

  const southPole = {
    latitude: -90,
    longitude: 1
  }

  // Since the Radius of Earth is considered different for different calculations
  // it will be around +/- 100 to 20000
  const expectedLength = 20000;
  const actualLength = geometryUtils.getGreatCircleDistance(northPole, southPole);
  const difference = expectedLength - actualLength;

  expect(difference).toBeLessThanOrEqual(100)
  expect(difference).toBeGreaterThanOrEqual(-100)
})