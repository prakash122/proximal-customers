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

  test('When the point is on the rim of the circle', () => {
    const circleDefinition = {
      center: {
        latitude: 53.339428,
        longitude: -7.257664
      }
    };
    const location = {
      latitude: "53.2451022",
      longitude: "-6.238335"
    };
    // Setting radius as distance between points
    circleDefinition.radius = geometryUtils.getGreatCircleDistance(circleDefinition.center, location);
    expect(geometryUtils.isInCircle(circleDefinition, location)).toBeTruthy();
  })

  test('Points are as near as 200 metre', () => {

    const point1 = { latitude: 12.952879, longitude: 77.660349 };
    const point2 = { latitude: 12.952890, longitude: 77.657871 }
    const distance = geometryUtils.getGreatCircleDistance(point1, point2);
    expect(distance).toBeLessThanOrEqual(0.3);
    expect(distance).toBeGreaterThanOrEqual(0.2);
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
});

describe('Convert to Radians', () => {
  test('convert degrees to radians', () => {
    const sampleDegreeValue = '90';
    const expectedRadianValue = 1.5708
    const actualRadianValue = geometryUtils.getRadiansFromDegrees(sampleDegreeValue);

    // Comparing to four decimals
    expect(Math.round(10000 * actualRadianValue))
      .toBe(expectedRadianValue * 10000)
  })
});

describe('Is In proximity', () => {
  test('When the center is a pole with radius as 0', () => {
    const circleDefinition = {
      radius: 0,
      center: {
        latitude: 90,
        longitude: 180
      }
    };

    const northPole = { latitude: 90, longitude: 0 }
    expect(geometryUtils.isInCircle(circleDefinition, northPole)).toBe(true);
    const southPole = { latitude: -90, longitude: 1 }
    expect(geometryUtils.isInCircle(circleDefinition, southPole)).toBe(false);
  })

  test('When the point has an invalid location return false', () => {
    const circleDefinition = {
      radius: 0,
      center: {
        latitude: 90,
        longitude: 180
      }
    };

    const invalidPoint = { latitude: 900, longitude: 0 }
    expect(geometryUtils.isInCircle(circleDefinition, invalidPoint)).toBe(false);
  });

  test('When the circle details are invalid return false', () => {
    const inValidCircleDefinition = {
      radius: 0,
      center: {
        latitude: 90,
        longitude: 190 // Invalid valid for a longitude
      }
    };

    const invalidPoint = { latitude: 90, longitude: 0 }
    expect(geometryUtils.isInCircle(inValidCircleDefinition, invalidPoint)).toBe(false);
  });

  test('when the point is inside circle Return true', () => {
    const circleDefinition = {
      "center": {
        "latitude": 53.339428,
        "longitude": -7.257664
      },
      "radius": 100
    };

    const nearbyCustomer = { "latitude": "53.2451022", "user_id": 4, "name": "Ian Kehoe", "longitude": "-6.238335" };
    expect(geometryUtils.isInCircle(circleDefinition, nearbyCustomer)).toBe(true);
  });
})