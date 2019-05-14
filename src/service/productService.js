import Auth from './Auth'
import env from './env'

export const getAll = async () => {
  let products = await fetch(`${env.API_URL}/product`, {
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
    }
  })
  products = await products.json()
  return products
}

export const getById = async id => {
  let product = await fetch(`${env.API_URL}/product/${id}`, {
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
    }
  })
  product = await product.json()
  return product
}

export const create = async data => {
  let response = await fetch(`${env.API_URL}/product`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  response = await response.json()
  return response
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
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
    }
  })
  response = await response.json()

  return response
}
