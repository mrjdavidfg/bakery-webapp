import React, { useState, useEffect } from 'react'
import * as productService from '../service/productService'
import * as pickUpLocationService from '../service/pickUpLocationService'
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
  Select,
  Typography,
  Divider,
  Popconfirm,
  Alert
} from 'antd'
import { States } from './OrderState'
import OrderReview from './OrderReview'
import { range, wait } from '../service/Util'
const { Text, Title } = Typography

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

//needed for product items adding and removing
let id = 0

export default Form.create({ name: 'new_order_form' })(function(props) {
  const { visible, onCancel, onCreate, order, form } = props

  const { getFieldDecorator, getFieldValue, validateFields } = form

  //#region STATE
  const [currentStep, setCurrentStep] = useState(0)
  const [products, setProducts] = useState(new Map())
  const [pickUpLocations, setPickUpLocations] = useState(new Map())
  const [wasProductsDropdownFocused, setWasProductsDropdownFocused] = useState(
    false
  ) //control products deferred loading when dropdown focused
  const [
    wasPickUpLocationsDropdownFocused,
    setWasPickUpLocationsDropdownFocused
  ] = useState(false) //control pick up locations deferred loading when dropdown focused
  const [isPickUpLocationsLoading, setIsPickUpLocationsLoading] = useState(
    false
  ) //control loading icon in dropdown when loading pickup locations
  const [isProductsLoading, setIsProductsLoading] = useState(false) //control loading icon in dropdown when loading pickup locations
  //#endregion

  useEffect(() => {
    const fechProducts = async () => {
      const _products = await productService.getAll()
      setProducts(new Map(_products.map(p => [p.id, p])))
    }
    const fechPickUpLocations = async () => {
      const _pickUpLoc = await pickUpLocationService.getAll()
      setPickUpLocations(new Map(_pickUpLoc.map(p => [p.id, p])))
    }

    if (wasProductsDropdownFocused) {
      fechProducts()
      setIsProductsLoading(false)
    }
    if (wasPickUpLocationsDropdownFocused) {
      fechPickUpLocations()
      setIsPickUpLocationsLoading(false)
    }
  }, [wasProductsDropdownFocused, wasPickUpLocationsDropdownFocused])

  const loadProducts = () => {
    if (!wasProductsDropdownFocused) {
      setIsProductsLoading(true)
      setWasProductsDropdownFocused(true)
    }
  }

  const loadPickUpLocations = () => {
    if (!wasPickUpLocationsDropdownFocused) {
      setIsPickUpLocationsLoading(true)
      setWasPickUpLocationsDropdownFocused(true)
    }
  }

  getFieldDecorator('keys', { initialValue: [0] })
  const keys = getFieldValue('keys')

  const add = k => {
    if (k !== keys.length - 1) {
      return
    }

    const nextKeys = keys.concat(++id)

    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  const remove = k => {
    // We need at least one
    if (keys.length === 1) {
      return
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  const productsFormItems = keys.map((k, index) => {
    const productId = getFieldValue(
      `items[${k}].product`
    ) /*|| order && order.items[k].product.id*/
    const quantity = getFieldValue(`items[${k}].quantity`) || 1
    let price
    if (productId) {
      price = products.get(productId).price * quantity
    }

    return (
      <React.Fragment key={k}>
        {index !== 0 && <Divider dashed />}
        <Row gutter={6}>
          <Col span={18}>
            <Row gutter={6}>
              <Col span={18}>
                <Form.Item label="Product">
                  {getFieldDecorator(`items[${k}].product`, {
                    initialValue: order && order.items[k].product.id
                  })(
                    <Select
                      placeholder="Select a product"
                      onSelect={() => add(k)}
                      onFocus={() => loadProducts()}
                      showSearch
                      loading={isProductsLoading}
                    >
                      {Array.from(products).map(([k, p]) => (
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
                    initialValue:
                      (order && order.items[k].quantity) ||
                      (productId ? 1 : undefined)
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
              {getFieldDecorator(`items[${k}].details`, {
                initialValue: order && order.items[k].details
              })(
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
      if (i.product === undefined) {
        return 0
      }
      return products.get(i.product).price * i.quantity
    })
    .reduce((a, b) => a + b)

  const edit = () => {
    setCurrentStep(1)
  }

  const review = () => {
    validateFields((err, values) => {
      if (err) {
        console.log(values)
        return
      }

      if (values.items[0].product === undefined) {
        return
      }

      setCurrentStep(2)
    })
  }

  const back = () => {
    setCurrentStep(1)
  }

  const processOrder = async () => {
    setCurrentStep(3)
    await wait(1)

    await onCreate()
    setCurrentStep(0) //reset step for next openning of modal
  }

  const totalText = (
    <div key="total" style={{ display: 'inline-block', marginRight: 10 }}>
      <Text>Total </Text>
      <Text strong style={{ fontSize: 20 }}>{`$ ${totalPrice || 0.0}`}</Text>
    </div>
  )

  //#region Footer logic
  //step 0
  const modalFooterComment = [
    <Button key="cancel" onClick={onCancel} style={{ float: 'left' }}>
      Cancel
    </Button>,
    totalText,
    <Button key="edit" type="primary" onClick={() => edit()}>
      Edit Order
      <Icon type="edit" />
    </Button>
  ]
  //step 1
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
    totalText,
    <Button key="review" type="primary" onClick={() => review()}>
      Review
      <Icon type="arrow-right" />
    </Button>
  ]
  //step 2-3
  const modalFooterReview = [
    <Button
      key="back"
      onClick={() => back()}
      style={{ float: 'left' }}
      disabled={currentStep === 3}
    >
      <Icon type="arrow-left" />
      Back
    </Button>,
    totalText,
    <Button
      key="ok"
      type="primary"
      onClick={async () => await processOrder()}
      disabled={currentStep === 3}
      loading={currentStep === 3}
    >
      Process Order
      <Icon type="check" />
    </Button>
  ]

  let footer

  if (currentStep === 0 && !order) {
    //if it's not edition
    setCurrentStep(1) //step to the new form
  }

  let orderValues = form.getFieldsValue()

  if (currentStep === 0) {
    footer = modalFooterComment
  } else if (currentStep === 1) {
    footer = modalFooter
  } else {
    footer = modalFooterReview
  }
  //#endregion

  return (
    <Modal
      visible={visible}
      title={
        <React.Fragment>
          <Title level={2}>New Order</Title>
          <Steps size="small" current={currentStep}>
            {steps.map(s => (
              <Steps.Step key={s.title} title={s.title} />
            ))}
          </Steps>
        </React.Fragment>
      }
      footer={footer}
      width={1000}
      closable={false}
    >
      {currentStep === 0 && <OrderReview order={order} products={products} />}
      <Form layout="vertical" className={currentStep === 1 ? '' : 'hidden'}>
        {order && (
          <div>
            <Form.Item>
              {getFieldDecorator('state', {
                initialValue: order && order.state
              })}
              (
              <Select placeholder="Select a state">
                {Array.from(States).map(s => (
                  <Select.Option value={s} key={S}>
                    {s}
                  </Select.Option>
                ))}
              </Select>
              )
            </Form.Item>
            <Text className="float-right">Order #{order.number}</Text>
          </div>
        )}
        <Row gutter={12}>
          {/* Fist Column */}
          <Col span={6}>
            <Form.Item label="Due Date">
              {getFieldDecorator('dueDate', {
                initialValue:
                  (order && moment(order.dueDate)) ||
                  moment(new Date())
                    .add(1, 'days')
                    .add(1, 'hour')
                    .startOf('hour'),
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
                  disabledTime={disabledTime}
                  format="DD/MM/YYYY  |  h:mm a"
                  style={{ width: '100%' }}
                  showTime={{
                    use12Hours: true,
                    minuteStep: 15,
                    hideDisabledOptions: true,
                    format: 'h:mm a',
                    disabledTime: disabledTime
                  }}
                />
              )}
            </Form.Item>
            <Form.Item label="PickUp Location">
              {getFieldDecorator(`pickUpLocation`, {
                initialValue: order && order.pickUpLocation.id
              })(
                <Select
                  placeholder="Select a pick up location"
                  onFocus={() => loadPickUpLocations()}
                  loading={isPickUpLocationsLoading}
                >
                  {Array.from(pickUpLocations).map(([k, p]) => (
                    <Select.Option value={p.id} key={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          {/* Second Column */}
          <Col span={18}>
            {/* Customer Row */}
            <Row gutter={6}>
              <Col span={18}>
                <Form.Item label="Customer">
                  {getFieldDecorator('name', {
                    initialValue: order && order.customer.name,
                    rules: [
                      {
                        required: true,
                        message: 'Please input the customer name!'
                      }
                    ]
                  })(<Input prefix={<Icon type="user" />} />)}
                </Form.Item>
                <Form.Item label="Aditional Details">
                  {getFieldDecorator('details', {
                    initialValue: order && order.customer.details,
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
                    initialValue: order && order.customer.phone,
                    rules: [
                      {
                        required: true,
                        message: 'Please input the customer phone!'
                      }
                    ]
                  })(<Input prefix={<Icon type="phone" />} />)}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Products Row */}
        <Row gutter={6}>
          <Divider>Products List</Divider>
          {productsFormItems}
        </Row>
      </Form>
      {currentStep === 2 && (
        <OrderReview order={orderValues} products={products} />
      )}
      {currentStep === 3 && (
        <div className="flex-full-center">
          <Alert message="Order created" type="success" />
        </div>
      )}
    </Modal>
  )
})

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

function disabledTime() {
  return {
    disabledHours: () => [12]
  }
}
