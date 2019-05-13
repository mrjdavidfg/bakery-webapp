import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './util/Auth'

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)
