import React, { useState, useEffect } from 'react'
import { List, Card, Row, Col, Tag, Typography } from 'antd'

const { Title, Text } = Typography

export default function Order(props) {
  const { item } = props

  let color
  switch (item.state) {
    case 'ready':
      color = 'green'
      break
    default:
      color = 'red'
      break
  }
  return (
    <Card>
      <Row gutter={4}>
        <Col span={2}>
          <div>
            <Tag color={color}>{item.state}</Tag>
          </div>
        </Col>
        <Col span={4}>
          <Title level={3}>{item.date}</Title>
          <Text type="secondary">{item.pickUpLocation}</Text>
        </Col>
        <Col span={18}>
          <Title level={3}>{item.user.name}</Title>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={item.items}
            renderItem={sub => (
              <List.Item>
                <Tag color="gray">{sub.quantity}</Tag>
                <Text type="secondary">{sub.name}</Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  )
}
