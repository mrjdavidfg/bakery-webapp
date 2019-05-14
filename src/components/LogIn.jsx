import React from 'react'
import { Form, Icon, Input, Button, Card } from 'antd'
import Auth from './util/Auth'

const centerGridStyle = {
  display: 'grid',
  placeItems: 'center'
}

function LogInForm(props) {
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password} = values

        if (await Auth.logIn({ email, password})) {
          this.setState(state => {
            return {
              ...state,
              isLoginOk: true
            }
          })
        }
      }
    })
  }

  const { getFieldDecorator } = props.form

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
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
