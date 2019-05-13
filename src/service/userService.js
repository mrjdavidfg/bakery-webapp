import Auth from '../util/Auth'
import env from './env'

export const getAll = async () => {
  let users = await fetch(`${env.API_URL}/user`)
  users = await users.json()
  return users
}

export const getById = async id => {
  let user = await fetch(`${env.API_URL}/user/${id}`)
  user = await user.json()
  return user
}

export const create = async data => {
  let response = await fetch(`${env.API_URL}/user`, {
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
  let response = await fetch(`${env.API_URL}/user/${data.id}`, {
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
  let response = await fetch(`${env.API_URL}/user/${id}`, {
    method: 'delete'
  })
  response = await response.json()

  return response
}
