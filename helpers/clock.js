const reverseH = h => 12 - h
const reverseM = m => 60 - m * 5
const degFromI = i => i * 30

const createHours = () => Array.from(new Array(12), (_, i) => {
  const h = reverseH(i)
  const deg = degFromI(i)
  return { h, deg }
})

const createMinutes = () => Array.from(new Array(12), (_, i) => {
  const m = reverseM(i)
  const deg = degFromI(i)
  return { m, deg }
})

const getHourFromDegrees = deg => 12 - (deg / 360) * 12
const getMinuteFromDegrees = deg => 60 - (deg / 360) * 60

const toRad = deg => (deg * Math.PI) / 180

const toDeg = rad => (rad * 180) / Math.PI

// // TODO: this is bad and i should feel bad fix it to be more elegant
// const getHourFromDegrees = (deg) => {
//   const value = Math.round((deg / 360) * 12)
//   return value === 0 ? 12 : value
// }
// const getMinuteFromDegrees = deg => Math.round((deg / 360) * 60) % 60

export default {
  createHours,
  createMinutes,
  getHourFromDegrees,
  getMinuteFromDegrees,
  toRad,
  toDeg,
}
