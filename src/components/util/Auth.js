export default {
  isAuthenticated() {
    return true
    // return this.getToken() ? true : false
  }
  // ,

  // getToken() {
  //   return localStorage.getItem('auth_token')
  // },

  // async logIn(credentials) {
  //   try {
  //     let response = await fetch(
  //       // 'http://localhost:3001/auth/token',
  //       'https://restaurant-api-123.herokuapp.com/auth/token',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(credentials),
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //     response = await response.json()
  //     // loocalSotrage.setItem is sync but behaves like async because setItem takes a few ms
  //     localStorage.setItem('auth_token', response.auth_token)
  //     return true
  //   } catch (error) {
  //     console.error(error)
  //     // localStorage.removeItem('auth_token')
  //     return false
  //   }
  // },

  // logOut() {
  //   localStorage.removeItem('auth_token')
  // }
}
