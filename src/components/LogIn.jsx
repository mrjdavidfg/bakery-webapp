import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Card, message } from 'antd'
import Auth from '../service/Auth'

const centerGridStyle = {
  display: 'grid',
  placeItems: 'center'
}

function LogInForm(props) {
  const [wasLoggedIn, setWasLoggedIn] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const { email, password } = values

        if (await Auth.logIn({ email, password })) {
          message.success('¡Welcome to BakeryJS!', 2)
          setWasLoggedIn(true)
        } else {
          message.error('Authentication failed. Wrong email or password.')
        }
      }
    })
  }

  const { getFieldDecorator } = props.form

  if (Auth.isAuthenticated() || wasLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            { required: true, message: 'Please input your email!' }
          ]
        })(
          <Input
            prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default function LogIn() {
  const WrappedLogInForm = Form.create({ name: 'login_form' })(LogInForm)

  return (
    <div style={centerGridStyle}>
      <Card title="BakeryJS" style={{ width: 600 }}>
        <WrappedLogInForm />
      </Card>
    </div>
  )
}
