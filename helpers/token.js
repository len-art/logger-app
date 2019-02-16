import decode from 'jwt-decode'
import isBefore from 'date-fns/isBefore'

const isValid = (token = '') => {
  try {
    const decoded = decode(token)
    if (decoded.iss !== 'LoggerApp') return false
    console.log('checking if valid', decoded.exp, new Date(), isBefore(decoded.exp, new Date()))
    return isBefore(decoded.exp, new Date())
  } catch (error) {
    console.error(error)
    return false
  }
}

export default { isValid }
