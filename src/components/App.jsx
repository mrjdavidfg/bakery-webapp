import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LogIn from './LogIn'
import Main from './Main'

function App() {
  return (
    <Switch>
      <Route path="/login" component={LogIn} />
      <PrivateRoute component={Main} />
    </Switch>
  )
}

export default App
