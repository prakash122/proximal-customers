const geometryUtils = require('../src/utils/geometry.utils');

describe('Distance b/w 2 geo-locations', () => {

  test('Length of a Earth\'s longitude', () => {

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

  test('Points are as near as 200 metre', () => {

    const point1 = { latitude: 12.952879, longitude: 77.660349 };
    const point2 = { latitude: 12.952890, longitude: 77.657871 }
    const distance = geometryUtils.getGreatCircleDistance(point1, point2);
    console.log(distance);
  })

  test('When points are given in string format', () => {

    const point1 = { latitude: "12.952879", longitude: 77.660349 };
    const point2 = { latitude: 12.952890, longitude: "77.657871" }
    const distance = geometryUtils.getGreatCircleDistance(point1, point2);
    expect(typeof distance === 'number').toBeTruthy();
  })


  test('When invalid latitude is passed distance is null', () => {

    // 212.952879 is not a valid latitude
    const point1 = { latitude: 212.952879, longitude: 77.660349 };
    const point2 = { latitude: 12.952890, longitude: 77.657871 };
    const distance = geometryUtils.getGreatCircleDistance(point1, point2);
    expect(distance).toBeNull();
  })

  test('When invalid longitude is passed distance is null', () => {

    // 197.660349 is not a valid longitude
    const point1 = { latitude: 12.952879, longitude: 197.660349 };
    const point2 = { latitude: 12.952890, longitude: 77.657871 }
    const distance = geometryUtils.getGreatCircleDistance(point1, point2);
    expect(distance).toBeNull();
  })

})

describe('Convert to Radians', () => {
  test('When')
})

describe('Is In proximity', () => {
  test('When the radius is 0')
  test('When the point has an invalid return false')
  test('When the circle details are invalid return false')
  test('When the point on the circumference return true')
})