import Auth from '../util/Auth'
import env from './env'

export const getAll = async () => {
  let orders = await fetch(`${env.API_URL}/order`)
  orders = await orders.json()
  return orders
}

export const getById = async id => {
  let order = await fetch(`${env.API_URL}/order/${id}`)
  order = await order.json()
  return order
}

export const create = async data => {
  let response = await fetch(`${env.API_URL}/order`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: data
  })
  response = await response.json()

  return response.id
}

export const update = async data => {
  let response = await fetch(`${env.API_URL}/order/${data.id}`, {
    method: 'patch',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: data
  })
  response = await response.json()

  return response.id
}

export const deleteById = async id => {
  let response = await fetch(`${env.API_URL}/order/${id}`, {
    method: 'delete'
  })
  response = await response.json()

  return response
}
