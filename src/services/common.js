import get from 'lodash/get'

export const getBounds = data => {
  let minLat = Number.MAX_SAFE_INTEGER
  let maxLat = - Number.MAX_SAFE_INTEGER
  let minLng = Number.MAX_SAFE_INTEGER
  let maxLng = - Number.MAX_SAFE_INTEGER
  data.forEach(([, , lat, lng]) => {
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
  })
  return {
    east: maxLng,
    north: maxLat,
    south: minLat,
    west: minLng,
  }
}

export const getPropSum = (objArr, prop) =>
  objArr.reduce((sum, obj) => {
    sum += get(obj, prop, 0)
    return sum
  }, 0)

export const addCommasToNumber = number =>
  window.Intl
    ? new Intl.NumberFormat().format(number)
    : number
