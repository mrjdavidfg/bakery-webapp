import React, { useState, useEffect } from 'react'
import { List, Divider, Row, Col, Tag, Typography, Input, Button } from 'antd'
import Order from './Order'
import OrderNewForm from './OrderNewForm'

const Search = Input.Search
const { Title, Text } = Typography

const data = [
  {
    date: '12:00 PM',
    state: 'ready',
    pickUpLocation: 'Store',
    user: {
      name: 'David Ferreira'
    },
    items: [
      {
        name: 'Cooffe',
        quantity: 2
      },
      {
        name: 'Latte',
        quantity: 1
      },
      {
        name: 'Latte',
        quantity: 1
      },
      {
        name: 'Latte',
        quantity: 1
      },
      {
        name: 'Latte',
        quantity: 1
      }
    ]
  },
  {
    date: '08:00 PM',
    state: 'problem',
    pickUpLocation: 'Bakery',
    user: {
      name: 'Fulano De Tal'
    },
    items: [
      {
        name: 'Water',
        quantity: 2
      }
    ]
  }
]

export default function Storefront() {
  const [visible, setVisible] = useState(false)

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

  const handleCreate = () => {
    console.log('Creating order...')
    console.log(formRef.getForm().getFieldsValue())
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
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Order item={item} />
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
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Order item={item} />
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
        dataSource={data}
        renderItem={item => {
          return (
            <List.Item>
              <Order item={item} />
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
