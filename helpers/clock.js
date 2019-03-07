const createHours = () => Array.from(new Array(12), (_, i) => {
  /* shift 90 degrees so positions start at the top */
  const deg = (270 - i * 30) % 360
  /* reverse hours for easier calcuation and display */
  const h = 12 - i
  return { h, deg }
})

const createMinutes = () => Array.from(new Array(12), (_, i) => {
  /* shift 90 degrees so positions start at the top */
  const deg = (270 - i * 30) % 360
  /* reverse minutes for easier calcuation and display */
  const m = (60 - i * 5) % 60
  return { m, deg }
})

// TODO: this is bad and i should feel bad fix it to be more elegant
const getHourFromDegrees = (deg) => {
  const value = Math.round((deg / 360) * 12)
  return value === 0 ? 12 : value
}
const getMinuteFromDegrees = deg => Math.round((deg / 360) * 60) % 60

export default {
  createHours,
  createMinutes,
  getHourFromDegrees,
  getMinuteFromDegrees,
}
