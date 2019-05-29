import React from 'react'
import { Tag, Icon } from 'antd'

export default function OrderState(props) {
  const { state } = props

  let color

  switch (state) {
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

  return (
    <Tag color={color}>
      {state == 'delivered' ? <Icon type="check" /> : state}
    </Tag>
  )
}

export const States = [
  'New',
  'Confirmed',
  'Ready',
  'Delivered',
  'Cancelled',
  'Problem'
]
