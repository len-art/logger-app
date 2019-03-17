const urlPrefix = process.env.BACKEND_URL || 'http://localhost:8080'

const client = (url, args) => new Promise(async (res, rej) => {
  try {
    const response = await fetch(`${urlPrefix}/${url}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    })
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
