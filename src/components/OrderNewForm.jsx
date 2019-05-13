import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Icon } from 'antd'

export default Form.create({ name: 'new_order_form' })(function(props) {
  const { visible, onCancel, onCreate, form } = props

  const { getFieldDecorator } = form

  return (
    <Modal
      visible={visible}
      title="New Order"
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Row>
          <Col span={12}>H</Col>
          <Col span={12}>A</Col>
        </Row>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input the name of the product!'
              }
            ]
          })(<Input placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Price">
          {getFieldDecorator('price', {
            initialValue: product ? product.price : undefined,
            rules: [
              {
                required: true,
                message: 'Please input the price of the product!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Price"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
})
