import React, { useState, useEffect } from 'react'
import moment from 'moment'
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Icon,
  Steps,
  DatePicker,
  TimePicker,
  Select,
  Typography
} from 'antd'
const { Text } = Typography

function range(start, end) {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

function disabledTime() {
  return {
    disabledHours: () => range(0, 4)
  }
}

function ModalTitle(props) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    {
      title: 'Form',
      content: 'First-content'
    },
    {
      title: 'Review',
      content: 'Second-content'
    },
    {
      title: 'Done',
      content: 'Third-content'
    }
  ]

  return (
    <Steps size="small" style={{ width: '90%' }} current={currentStep}>
      {steps.map(item => (
        <Steps.Step key={item.title} title={item.title} />
      ))}
    </Steps>
  )
}

export default Form.create({ name: 'new_order_form' })(function(props) {
  const { visible, onCancel, onCreate, form } = props
  const { getFieldDecorator, getFieldValue } = form

  const [products, setProducts] = useState([{ id: 1, name: 'Pan', price: 200 }])

  getFieldDecorator('items', { initialValue: [{}] })
  const items = getFieldValue('items')

  const add = () => {
    const nextItems = items.concat(i++)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  const handleSelect = (value, option) => {
    console.log('value : ', value)
    console.log('option : ', option)
  }

  const productsFormItems = items.map((item, index) => (
    <Row gutter={6} key={index}>
      <Col span={18}>
        <Row gutter={6}>
          <Col span={18}>
            <Form.Item label={index === 0 ? 'Products' : ''} key={index}>
              {getFieldDecorator(`product[${index}].name`, {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: 'Please select a product!'
                  }
                ]
              })(
                <Select placeholder="Select a product" onSearch={handleSelect}>
                  {products.map(p => (
                    <Select.Option value={p.id} key={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Quantity">
              {getFieldDecorator(`product[${index}].quantity`, {
                initialValue: 1
              })(
                <InputNumber min={1} precision={0} style={{ width: '100%' }} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Details">
          {getFieldDecorator(`product[${index}].details`)(
            <Input placeholder="Details" />
          )}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Text>{item.price ? item.price * item.quantity : ''}</Text>
        <Button
          type="dashed"
          size="small"
          icon="close"
          disabled={item.price ? false : true}
        />
      </Col>
    </Row>
  ))

  const config = {
    rules: [{ type: 'object', required: true, message: 'Please select date!' }]
  }

  return (
    <Modal
      visible={visible}
      title={<ModalTitle />}
      onOk={onCreate}
      onCancel={onCancel}
      width={800}
    >
      <Form layout="vertical">
        <Row gutter={6}>
          {/* Fist Column */}
          <Col span={6}>
            <Form.Item label="Due">
              {getFieldDecorator('dueDate', config)(
                <DatePicker
                  disabledDate={disabledDate}
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('dueTime', config)(
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  disabledTime={disabledTime}
                  minuteStep={60}
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
          {/* Second Column */}
          <Col span={18}>
            {/* Customer Row */}
            <Row gutter={6}>
              <Col span={18}>
                <Form.Item label="Customer">
                  {getFieldDecorator('customer', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input the name of the customer!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  )}
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
              </Col>
              <Col span={6}>
                <Form.Item label="Phone">
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input the customer phone!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            {/* Products Row */}
            <Row gutter={6}>{productsFormItems}</Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})
