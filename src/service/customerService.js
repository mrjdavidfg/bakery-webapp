import Auth from '../util/Auth'
import env from './env'

export const getAll = async () => {
  let customers = await fetch(`${env.API_URL}/customer`)
  customers = await customers.json()
  return customers
}

export const getById = async id => {
  let customer = await fetch(`${env.API_URL}/customer/${id}`)
  customer = await customer.json()
  return customer
}

export const create = async data => {
  let response = await fetch(`${env.API_URL}/customer`, {
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
  let response = await fetch(`${env.API_URL}/customer/${data.id}`, {
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
  let response = await fetch(`${env.API_URL}/customer/${id}`, {
    method: 'delete'
  })
  response = await response.json()

  return response
}
