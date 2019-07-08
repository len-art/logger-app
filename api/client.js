export default class {
  defaults = {
    prefix: '',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }

  constructor(defaults) {
    this.defaults = { ...this.defaults, ...defaults }
  }

  setHeader = (name, value) => {
    this.defaults.headers[name] = value
  }

  call = async (url, method, args, settings = this.defaults) => new Promise(async (res, rej) => {
    try {
      const { prefix, headers } = settings
      const response = await fetch(`${prefix}/${url}`, {
        method,
        headers,
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
      console.log(error)
      rej(error)
    }
  })

  post = (url, args, settings) => this.call(url, 'POST', args, settings)
}
