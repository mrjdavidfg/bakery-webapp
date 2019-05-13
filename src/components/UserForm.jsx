import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Select, Row, Col } from 'antd'

export default Form.create({ name: 'user_form' })(function(props) {
  const {
    visible,
    edition,
    onDelete,
    onCancel,
    onCreate,
    onSave,
    form,
    user
  } = props

  const { getFieldDecorator } = form

  const title = edition ? 'Edit user ' : 'Create user'
  console.log('user: ', user)
  const buttons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>
  ]

  if (edition) {
    buttons.unshift(
      <Button
        key="delete"
        type="danger"
        onClick={onDelete}
        style={{ float: 'left' }}
      >
        Delete
      </Button>
    )
    buttons.push(
      <Button key="edit" type="primary" onClick={onSave}>
        Save
      </Button>
    )
  } else {
    buttons.push(
      <Button key="edit" type="primary" onClick={onCreate}>
        Create
      </Button>
    )
  }

  return (
    <Modal visible={visible} title={title} footer={buttons} onCancel={onCancel}>
      <Form layout="vertical">
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            initialValue: user ? user.email : undefined,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input the name of the user!'
              }
            ]
          })(<Input placeholder="user@example.com" />)}
        </Form.Item>
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item label="First name">
              {getFieldDecorator('firstName', {
                initialValue: user ? user.firstName : undefined,
                rules: [
                  {
                    required: true,
                    message: 'Please input the first name!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last name">
              {getFieldDecorator('lastName', {
                initialValue: user ? user.lastName : undefined,
                rules: [
                  {
                    required: true,
                    message: 'Please input the last name!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            initialValue: user ? user.password : undefined,
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              }
            ]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item label="Role" hasFeedback>
          {getFieldDecorator('role', {
            initialValue: user ? user.role : 'barista',
            rules: [{ required: true, message: 'Please select a role!' }]
          })(
            <Select placeholder="Please select a role">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="barista">Barista</Select.Option>
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
})
