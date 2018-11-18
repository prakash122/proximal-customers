
const MEAN_EARTH_RADIUS = 6371;

function isInCircle(circle, point) {

  const distance = getGreatCircleDistance(circle.center, point);
  return distance < circle.radius;
}

function getRadiansFromDegrees(degreeValue) {

  return parseFloat(degreeValue) * 0.0174533;
}

function getGreatCircleDistance(point1, point2) {

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
  getGreatCircleDistance
}