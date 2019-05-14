import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Typography } from 'antd'
import Storefront from './Storefront'
import Dashboard from './Dashboard'
import Product from './Product'
import User from './User'

const { Title } = Typography
const { Header, Content } = Layout

export default function() {
  return (
    <Layout className="layout" style={{ height: '100%' }}>
      <Header>
        <Title className="logo" level={2}>
          Bakery
        </Title>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Link to="/storefront">
              <Icon type="form" />
              Storefront
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/dashboard">
              <Icon type="clock-circle" />
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/users">
              <Icon type="user" />
              Users
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/products">
              <Icon type="profile" />
              Products
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/logout">
              <Icon type="arrow-left" />
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', height: '100%' }}>
        <div style={{ background: '#fff', padding: 24, height: '100%' }}>
          <Route exact path="/storefront" component={Storefront} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/products" component={Product} />
          <Route exact path="/users" component={User} />
        </div>
      </Content>
    </Layout>
  )
}
