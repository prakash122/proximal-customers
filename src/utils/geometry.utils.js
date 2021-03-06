
const MEAN_EARTH_RADIUS = 6371;

/**
 * Checks if a point is inside the circle
 * @param {*} circle 
 * @param {*} point 
 */
function isInCircle(circle, point) {

  if (circle.radius === 0) {
    return getGreatCircleDistance(circle.center, point) === 0;
  }

  const distance = getGreatCircleDistance(circle.center, point);
  return distance && distance <= circle.radius;
}

/**
 * Converts given degrees into radians
 * @param {*} degreeValue 
 */
function getRadiansFromDegrees(degreeValue) {

  return parseFloat(degreeValue) * 0.0174533;
}

function isGeoLocationValid(geoLocation) {

  if (!geoLocation) return false;

  const parsedLatitude = parseFloat(geoLocation.latitude);
  const parsedLongitude = parseFloat(geoLocation.longitude);

  return !isNaN(geoLocation.latitude)
    && !isNaN(geoLocation.longitude)
    && (parsedLatitude >= -90 && parsedLatitude <= 90)
    && (parsedLongitude >= -180 && parsedLongitude <= 180);
}

/**
 * Compute the great circle distance between 2 geo-locations
 * @param {*} point1 
 * @param {*} point2 
 */
function getGreatCircleDistance(point1, point2) {

  if (!isGeoLocationValid(point1) || !isGeoLocationValid(point2)) {
    return null;
  }

  // If both the points are representing same pole with different longitude
  //  the formula is giving some noise, So I am explicitly checking for pole
  if (point1.latitude.toString() === point2.latitude.toString()
    && ['90', '-90'].indexOf(point1.latitude.toString() > -1)) {
    return 0;
  }

  const x1 = getRadiansFromDegrees(point1.latitude),
    y1 = getRadiansFromDegrees(point1.longitude);
  const x2 = getRadiansFromDegrees(point2.latitude),
    y2 = getRadiansFromDegrees(point2.longitude);

  // Segregated the formula of the Great Circle Distance in 4 parts for ease of comprehension
  a = Math.cos(x2) * Math.sin(y2 - y1)
  b = Math.cos(x1) * Math.sin(x2) - Math.sin(x1) * Math.cos(x2) * Math.cos(y2 - y1)
  c = Math.sin(x1) * Math.sin(x2) + Math.cos(x1) * Math.cos(x2) * Math.cos(y2 - y1)
  d = Math.sqrt(a * a + b * b)

  const centralAngle = Math.atan2(d, c);

  return MEAN_EARTH_RADIUS * centralAngle;
}

module.exports = {
  isInCircle,
  getRadiansFromDegrees,
  getGreatCircleDistance,
  isGeoLocationValid
}