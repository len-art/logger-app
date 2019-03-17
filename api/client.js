const urlPrefix = process.env.BACKEND_URL || 'http://localhost:8080'

const client = (url, args, options = {}) => new Promise(async (res, rej) => {
  try {
    const { method = 'POST' } = options
    const response = await fetch(`${urlPrefix}/${url}`, {
      method,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    })

    const hasContent = response.headers.get('Content-Length') > 0
    if (!hasContent) {
      res()
      return
    }

    if (response.ok) {
      res(await response.json())
    } else {
      const { message } = await response.json()
      throw new Error(message)
    }
  } catch (error) {
    rej(error)
  }
})

export default client
