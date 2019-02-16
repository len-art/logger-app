import decode from 'jwt-decode'

const isValid = (token = '') => {
  try {
    const decoded = decode(token)
    if (decoded.iss !== 'LoggerApp') return false
    return decoded.exp * 1000 > new Date().getTime()
  } catch (error) {
    console.error(error)
    return false
  }
}

export default { isValid }
