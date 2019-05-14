import env from './env'

export default {
  isAuthenticated() {
    return this.getToken() ? true : false
  },

  getToken() {
    return localStorage.getItem('auth_token')
  },

  async logIn(credentials) {
    try {
      let response = await fetch(`${env.API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      response = await response.json()
      console.log(response)

      if(response.error) {
        return false
      }

      localStorage.setItem('auth_token', response.authToken)
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
