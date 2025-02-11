
const R =  6378137.0

function y2lat(y) {
  return 180 * (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) / Math.PI
}

function lat2y(lat) {
  return R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 180 / 2))
}

function x2lon(x) {
  return 180 * x / R / Math.PI
}

function lon2x(lon) {
  return R * lon * Math.PI / 180
}

// do links

export function getLinkRosreestr(lat, lon) {
  return `https://nspd.gov.ru/map?thematic=PKK&zoom=18&coordinate_x=${lon2x(lon)}&coordinate_y=${lat2y(lat)}&active_layers=賐`
}

export function getLinkGoogle(lat, lon) {
  return `https://www.google.com/maps?q=${lat},${lon}&t=гибридный`
}

export function getLinkYandex(lat, lon) {
  const pair = `${lon}%2C${lat}`

  return `https://yandex.ru/maps/213/moscow/?ll=${pair}&mode=whatshere&whatshere%5Bpoint%5D=${pair}&whatshere%5Bzoom%5D=18&z=18`
}
