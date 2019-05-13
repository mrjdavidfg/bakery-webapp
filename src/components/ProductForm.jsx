import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Icon } from 'antd'

export default Form.create({ name: 'product_form' })(function(props) {
  const {
    visible,
    edition,
    onDelete,
    onCancel,
    onCreate,
    onSave,
    form,
    product
  } = props

  const { getFieldDecorator } = form

  const title = edition ? 'Edit Product ' : 'Create Product'
  console.log('product: ', product)
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
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: product ? product.name : undefined,
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
