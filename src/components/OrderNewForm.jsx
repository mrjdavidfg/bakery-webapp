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
  Typography,
  Divider,
  Statistic,
  Popconfirm,
  Tag
} from 'antd'
const { Text, Title } = Typography

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

function ModalHeader(props) {
  const { currentStep } = props

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
    <React.Fragment>
      <Title level={2}>New Order</Title>
      <Steps size="small" current={currentStep}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
    </React.Fragment>
  )
}

//needed for products items adding and removing
let id = 0

export default Form.create({ name: 'new_order_form' })(function(props) {
  const { visible, onCancel, onCreate, form } = props
  const { getFieldDecorator, getFieldValue, validateFields } = form

  const [currentStep, setCurrentStep] = useState(0)
  const [products, setProducts] = useState([
    { id: 1, name: 'Pan', price: 200 },
    { id: 2, name: 'Leche', price: 400 }
  ])

  getFieldDecorator('keys', { initialValue: [0] })
  const keys = getFieldValue('keys')

  const add = k => {
    if (k !== keys.length - 1) {
      return
    }

    const nextKeys = keys.concat(++id)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  const remove = k => {
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  const productsFormItems = keys.map(k => {
    const productId = getFieldValue(`items[${k}].id`)
    const quantity = getFieldValue(`items[${k}].quantity`) || 1
    let price
    if (productId && quantity) {
      price = products.find(p => p.id === productId).price * quantity
    }

    return (
      <React.Fragment key={k}>
        {k !== 0 ? <Divider dashed /> : undefined}
        <Row gutter={6}>
          <Col span={18}>
            <Row gutter={6}>
              <Col span={18}>
                <Form.Item label="Product">
                  {getFieldDecorator(`items[${k}].id`)(
                    <Select
                      placeholder="Select a product"
                      onChange={() => add(k)}
                      showSearch
                    >
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
                  {getFieldDecorator(`items[${k}].quantity`, {
                    initialValue: productId ? 1 : undefined
                  })(
                    <InputNumber
                      min={1}
                      precision={0}
                      style={{ width: '100%' }}
                      disabled={productId ? false : true}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Details">
              {getFieldDecorator(`items[${k}].details`)(
                <Input
                  placeholder="Details"
                  disabled={productId ? false : true}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <div
              style={{ marginTop: 30 }}
              className="flex-center-space-between"
            >
              <InputNumber
                disabled
                value={price || 0.0}
                precision={1}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
              <Divider type="vertical" />
              <Button
                type="dashed"
                icon="close"
                disabled={price ? false : true}
                style={{ height: 32 }}
                onClick={() => remove(k)}
              />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  })

  const totalPrice = getFieldValue('items')
    .map(i => {
      if (i.id === undefined) {
        return 0
      }
      return products[i.id - 1].price * i.quantity
    })
    .reduce((a, b) => a + b)

  const review = () => {
    validateFields((err, values) => {
      if (err) {
        console.log(values)
        return
      }

      if (values.items[0].id === undefined) {
        return
      }

      setCurrentStep(currentStep + 1)
    })
  }

  const back = () => {
    setCurrentStep(currentStep - 1)
  }

  const processOrder = async () => {
    await wait(1)

    onCreate()
  }

  const totalStatistic = (
    <Statistic
      key="total"
      title="Total"
      value={`$ ${totalPrice || 0.0}`}
      style={{ display: 'inline-block', paddingRight: 15 }}
    />
  )

  const modalFooter = [
    <Popconfirm
      key="cancel"
      title="Are you sure?"
      onConfirm={onCancel}
      okText="Yes"
      cancelText="No"
      placement="right"
    >
      <Button style={{ float: 'left' }}>Cancel</Button>
    </Popconfirm>,
    totalStatistic,
    <Button key="review" type="primary" onClick={() => review()}>
      Review
      <Icon type="arrow-right" />
    </Button>
  ]

  const modalFooterReview = [
    <Button key="back" onClick={() => back()} style={{ float: 'left' }}>
      <Icon type="arrow-left" />
      Back
    </Button>,
    totalStatistic,
    <Button key="ok" type="primary" onClick={() => processOrder()}>
      Process Order
      <Icon type="check" />
    </Button>
  ]

  return (
    <Modal
      visible={visible}
      title={<ModalHeader currentStep={currentStep} />}
      footer={currentStep === 0 ? modalFooter : modalFooterReview}
      width={1000}
      closable={false}
    >
      <Form layout="vertical" className={currentStep === 0 ? '' : 'hide'}>
        <Row gutter={12}>
          {/* Fist Column */}
          <Col span={6}>
            <Form.Item label="Due Date">
              {getFieldDecorator('dueDate', {
                initialValue: moment(new Date()).add(1, 'days'),
                rules: [
                  {
                    type: 'object',
                    required: true,
                    message: 'Please select a date!'
                  }
                ]
              })(
                <DatePicker
                  disabledDate={disabledDate}
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
            <Form.Item label="Due Time">
              {getFieldDecorator('dueTime', {
                rules: [
                  {
                    type: 'object',
                    required: true,
                    message: 'Please select a time!'
                  }
                ]
              })(
                <TimePicker
                  use12Hours
                  format="h:mm a"
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
                  {getFieldDecorator('details', {
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

            <Row gutter={6} />
          </Col>
        </Row>
        {/* Products Row */}
        <Row gutter={6}>
          <Divider>Products List</Divider>
          {productsFormItems}
        </Row>
      </Form>
      <Review className={currentStep === 1 ? '' : 'hide'} />
    </Modal>
  )
})

const Review = props => {
  const { className } = props

  return (
    <Row className={className}>
      <Col span={4}>
        <Text>Due</Text>
        <br />
        <Title level={2}>May 17</Title>
        <Text>Friday</Text>
      </Col>
      <Col span={4}>
        <Text />
        <br />
        <Title level={2}>4:00 PM</Title>
        <Text>Store</Text>
      </Col>
      <Col span={12}>
        <Text>Customer</Text>
        <br />
        <Title level={2}>David Ferreira</Title>
        <Divider />
        <Text>Products</Text>
        <br />
        <Title level={3} style={{ display: 'inline-block' }}>
          Pan
        </Title>
        <Tag>2</Tag>x<Text>$ 400</Text>
      </Col>
      <Col span={4}>
        <Text>Phone Number</Text>
        <br />
        <Title level={2}>123456</Title>
      </Col>
    </Row>
  )
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
