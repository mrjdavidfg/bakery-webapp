import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Card, message } from 'antd'
import Auth from '../service/Auth'

const centerGridStyle = {
  display: 'grid',
  placeItems: 'center'
}

export default function LogIn() {

  Auth.logOut()

  return (
    <Redirect to="/login" />
  )
}
