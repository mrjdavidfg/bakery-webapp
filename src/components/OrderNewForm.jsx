import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Icon, Step, Steps, DatePicker, Select } from 'antd'
import moment from 'moment'


function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

function disabledTime() {
  return {
    disabledHours: () => range(0, 8).concat(range(16, 24))
  }
}

const modalTitle = function(props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [products, _setProducts] = useState([])
  const steps = [
    {
      title: 'Form',
      content: 'First-content',
    },
    {
      title: 'Review',
      content: 'Second-content',
    }
  ]

  return (
    <Steps size="small" current={current}> 
      {steps.map(item => (
        <Step key={item.title} title={item.title} />
      ))}
    </Steps>
  )
}

export default Form.create({ name: 'new_order_form' })(function(props) {
  const { visible, onCancel, onCreate, form } = props

  const { getFieldDecorator } = form

  const config = {
    rules: [{ type: 'object', required: true, message: 'Please select date!' }],
  }

  return (
    <Modal
      visible={visible}
      title={modalTitle}
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Row>
          <Col span={6}>H</Col>
            <Form.Item label="Due">
              {getFieldDecorator('dueDate', config)(<DatePicker disabledDate={disabledDate} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('dueTime', config)(<TimePicker use12Hours format="h:mm a" disabledTime={disabledTime} minuteStep={60} />)}
            </Form.Item>
          <Col span={12}>
            <Form.Item label="Customer">
              {getFieldDecorator('customer', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the name of the customer!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Aditional Details">
              {getFieldDecorator('customer', {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Row>
              <Col span={18}>
                <Select placeholder="Select a product">
                 {products.map(p => <Select.Option value={p.id} key={p.id}>{p.name}</Select.Option>)}
                </Select>
              </Col>
              <Col span={6}>
                <Form.Item label="Customer">
                  {getFieldDecorator('customer', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input the name of the customer!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <InputNumber min={1} max={10} step={1} />
              </Col>
            </Row>
          </Col>
          <Col span={6}>A</Col>
        </Row>
        
      </Form>
    </Modal>
  )
})
