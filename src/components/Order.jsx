import React, { useState, useEffect } from 'react'
import { List, Card, Row, Col, Tag, Typography } from 'antd'
import moment from 'moment'
import OrderState from './OrderState'

const { Title, Text } = Typography

export default function Order(props) {
  const { order, from, handleClick } = props

  let color

  switch (order.state) {
    case 'New':
      color = 'blue'
      break
    case 'Ready':
      color = 'green'
      break
    case 'Problem':
      color = 'red'
      break
    default:
      //include 'confirmed', 'delivered', 'cancelled'
      color = ''
      break
  }

  let displayDatePrimary
  let displayDateSecondary

  switch (from) {
    case 'today':
      displayDatePrimary = moment(order.dueDate).format('h:mm A')
      break
    case 'week':
      displayDatePrimary = moment(order.dueDate).format('ddd D')
      displayDateSecondary = moment(order.dueDate).format('h:mm A')
      break
    default:
      //'upcoming'
      displayDatePrimary = moment(order.dueDate).format('MMM D')
      displayDateSecondary = moment(order.dueDate).format('dddd')
      break
  }

  return (
    <Card onClick={handleClick}>
      <Row gutter={4}>
        <Col span={2}>
          <div>
            <OrderState state={order.state} />
          </div>
        </Col>
        <Col span={4}>
          {displayDatePrimary && <Title level={3}>{displayDatePrimary}</Title>}
          {displayDateSecondary && (
            <Text>
              {displayDateSecondary}
              <br />
            </Text>
          )}
          <Text type="secondary">{order.pickUpLocation.name}</Text>
        </Col>
        <Col span={18}>
          <Title level={3}>{order.customer.name}</Title>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={order.items}
            renderItem={sub => (
              <List.Item>
                <Tag color="gray">{sub.quantity}</Tag>
                <Text type="secondary">{sub.product.name}</Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  )
}
