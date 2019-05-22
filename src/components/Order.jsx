import React, { useState, useEffect } from 'react'
import { List, Card, Row, Col, Tag, Icon, Typography } from 'antd'
import moment from 'moment'

const { Title, Text } = Typography

export default function Order(props) {
  const { item, from } = props

  let color

  switch (item.state) {
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
      displayDatePrimary = moment(item.dueDate).format('h:mm A')
      break
    case 'week':
      displayDatePrimary = moment(item.dueDate).format('ddd D')
      displayDateSecondary = moment(item.dueDate).format('h:mm A')
      break
    default:
      //'upcoming'
      displayDatePrimary = moment(item.dueDate).format('MMM D')
      displayDateSecondary = moment(item.dueDate).format('dddd')
      break
  }

  return (
    <Card>
      <Row gutter={4}>
        <Col span={2}>
          <div>
            <Tag color={color}>
              {item.state == 'delivered' ? <Icon type="check" /> : item.state}
            </Tag>
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
          <Text type="secondary">{item.pickUpLocation.name}</Text>
        </Col>
        <Col span={18}>
          <Title level={3}>{item.customer.name}</Title>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={item.items}
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
