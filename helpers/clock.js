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

const getMinuteFromDegrees = deg => Math.round((deg / 360) * 60) % 60

export default {
  createHours,
  createMinutes,
  getMinuteFromDegrees,
}
