const hToI = h => 12 - h
const mToI = m => 60 - m * 5
const degFromI = i => i * 30

const createHours = () => Array.from(new Array(12), (_, i) => {
  const h = hToI(i)
  const deg = degFromI(i)
  return { h, deg }
})

const createMinutes = () => Array.from(new Array(12), (_, i) => {
  const m = mToI(i)
  const deg = degFromI(i)
  return { m, deg }
})

const getHourFromDegrees = (deg) => {
  const val = 12 - (deg / 360) * 12
  return val === 0 ? 12 : val
}

const getMinuteFromDegrees = deg => 60 - (deg / 360) * 60

const toRad = deg => (deg * Math.PI) / 180

const toDeg = rad => (rad * 180) / Math.PI

export default {
  hToI,
  mToI,
  degFromI,
  createHours,
  createMinutes,
  getHourFromDegrees,
  getMinuteFromDegrees,
  toRad,
  toDeg,
}
