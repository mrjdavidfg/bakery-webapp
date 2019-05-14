import env from '../../service/env'

export default {
  isAuthenticated() {
    return this.getToken() ? true : false
  },

  getToken() {
    return localStorage.getItem('auth_token')
  },

  async logIn(credentials) {
    try {
      let response = await fetch(`${env.URL_API}/auth/token`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      response = await response.json()

      localStorage.setItem('auth_token', response.auth_token)
      return true
    } catch (error) {
      console.error(error)
      // localStorage.removeItem('auth_token')
      return false
    }
  },

  logOut() {
    localStorage.removeItem('auth_token')
  }
}
