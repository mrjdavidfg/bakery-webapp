import React from 'react'
import { Row, Col, Divider, Tag, List, Card, Typography } from 'antd'
const { Text, Title } = Typography

export default function OrderReview(props) {
  const { order, products } = props

  return (
    <div>
      <Row>
        <Col span={4}>
          <Text>Due</Text>
          <br />
          <Title level={2}>{order.dueDate.format('MMM D')}</Title>
          <Text>Friday</Text>
        </Col>
        <Col span={4}>
          <Text />
          <br />
          <Title level={2}>{order.dueDate.format('LT')}</Title>
          <Text>Store</Text>
        </Col>
        <Col span={12}>
          <Text>Customer</Text>
          <br />
          <Title level={2}>{order.name}</Title>
          {order.details && (
            <React.Fragment>
              <Text strong>Aditional details</Text>
              <br />
              <Text>{order.details}</Text>
            </React.Fragment>
          )}
        </Col>
        <Col span={4}>
          <Text>Phone Number</Text>
          <br />
          <Title level={2}>{order.phone}</Title>
        </Col>
      </Row>
      <Row>
        <Divider>Products</Divider>
        <List
          grid={{
            gutter: 10,
            column: 2
          }}
          dataSource={order.items.filter(i => i.product)}
          renderItem={item => (
            <List.Item>
              <Card
                bodyStyle={{
                  padding: 10
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Title
                    level={4}
                    style={{ display: 'inline-block', marginBottom: 0 }}
                  >
                    {products.get(item.product).name}
                  </Title>
                  <div>
                    <Tag>{item.quantity}</Tag>x
                    <Text>
                      {' '}
                      ${products.get(item.product).price * item.quantity}
                    </Text>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Row>
      {order.history && (
        <Row>
          <Divider>History</Divider>
          {order.history.map(h => {})}
        </Row>
      )}
    </div>
  )
}
