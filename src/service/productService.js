import Auth from '../util/Auth'
import env from './env'

export const getAll = async () => {
  let products = await fetch(`${env.API_URL}/product`)
  products = await products.json()
  return products
}

export const getById = async id => {
  let product = await fetch(`${env.API_URL}/product/${id}`)
  product = await product.json()
  return product
}

export const create = async data => {
  let response = await fetch(`${env.API_URL}/product`, {
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
  let response = await fetch(`${env.API_URL}/product/${data.id}`, {
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
  let response = await fetch(`${env.API_URL}/product/${id}`, {
    method: 'delete'
  })
  response = await response.json()

  return response
}
