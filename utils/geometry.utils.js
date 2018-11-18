
function isInCircle(circle, point) {
  x1 = circle.center.latitude * 0.0174533
  y1 = circle.center.longitude * 0.0174533
  x2 = parseFloat(point.latitude) * 0.0174533
  y2 = parseFloat(point.longitude) * 0.0174533

  const radius = 6371;
  a = Math.cos(x2) * Math.sin(y2 - y1)
  b = Math.cos(x1) * Math.sin(x2) - Math.sin(x1) * Math.cos(x2) * Math.cos(y2 - y1)
  c = Math.sin(x1) * Math.sin(x2) + Math.cos(x1) * Math.cos(x2) * Math.cos(y2 - y1)
  d = Math.sqrt(a * a + b * b)
  const distance = radius * Math.atan2(d, c);
  return distance < circle.radius;
}

module.exports = {
  isInCircle
}