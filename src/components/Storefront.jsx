import React, { useState, useEffect, useLayoutEffect } from 'react'
import { List, Divider, Row, Col, Tag, Typography, Input, Button } from 'antd'
import Order from './Order'
import OrderNewForm from './OrderNewForm'
import * as service from '../service/orderService'

const Search = Input.Search
const { Title, Text } = Typography

export default function Storefront() {
  const [visible, setVisible] = useState(false)
  const [ordersFromToday, setOrdersFromToday] = useState([])
  const [ordersFromWeek, setOrdersFromWeek] = useState([])
  const [ordersFromUpcoming, setOrdersFromUpcoming] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      setOrdersFromToday(await service.getAll('today'))
      setOrdersFromWeek(await service.getAll('week'))
      setOrdersFromUpcoming(await service.getAll('upcoming'))
    }

    fetchOrders()
  }, []) //must be called when a new order was created, modified or deleted

  let formRef

  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const sunday = nextDay(7)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    formRef.resetFields()
    setVisible(false)
  }

  const handleCreate = async () => {
    console.log('Creating order...')
    const data = formRef.getForm().getFieldsValue()
    data.items.length--
    delete data.keys

    await service.create(data)

    formRef.resetFields()
    setVisible(false)
  }

  const saveFormRef = (_formRef, index) => {
    formRef = _formRef
  }

  return (
    <React.Fragment>
      <Row style={{ paddingBottom: 25 }} gutter={6}>
        <Col span={18}>
          <Search placeholder="Search" onSearch={value => console.log(value)} />
        </Col>
        <Col span={6}>
          <Button
            type="primary"
            icon="plus"
            style={{ width: '100%' }}
            onClick={showModal}
          >
            New Order
          </Button>
          <OrderNewForm
            ref={saveFormRef}
            visible={visible}
            onCancel={handleCancel}
            onCreate={handleCreate}
          />
        </Col>
      </Row>
      {/* Today */}
      <Title level={4} style={{ display: 'inline-block' }}>
        Today
      </Title>
      <Divider type="vertical" />
      <Text type="secondary">{today.toLocaleDateString('en-US', options)}</Text>
      <List
        grid={{ column: 1 }}
        dataSource={ordersFromToday}
        renderItem={item => (
          <List.Item>
            <Order item={item} from="today" />
          </List.Item>
        )}
      />
      {/* This Week */}
      <Title level={4} style={{ display: 'inline-block' }}>
        This week
      </Title>
      <Divider type="vertical" />
      <Text type="secondary">
        {tomorrow.toLocaleDateString('en-US', options)} -{' '}
        {sunday.toLocaleDateString('en-US', options)}
      </Text>
      <List
        grid={{ column: 1 }}
        dataSource={ordersFromWeek}
        renderItem={item => (
          <List.Item>
            <Order item={item} from="week" />
          </List.Item>
        )}
      />
      {/* Upcoming - After this week */}
      <Title level={4} style={{ display: 'inline-block' }}>
        Upcoming
      </Title>
      <Divider type="vertical" />
      <Text type="secondary">After this week</Text>
      <List
        grid={{ column: 1 }}
        dataSource={ordersFromUpcoming}
        renderItem={item => {
          return (
            <List.Item>
              <Order item={item} from="upcoming" />
            </List.Item>
          )
        }}
      />
    </React.Fragment>
  )
}

function nextDay(x) {
  const now = new Date()
  now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7))
  return now
}
