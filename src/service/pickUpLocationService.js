import Auth from './Auth'
import env from './env'

export const getAll = async () => {
  let pickUpLocations = await fetch(`${env.API_URL}/pick_up_location`, {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    }
  })
  pickUpLocations = await pickUpLocations.json()
  return pickUpLocations
}

export const getById = async id => {
  let pickUpLocation = await fetch(`${env.API_URL}/pick_up_location/${id}`, {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    }
  })
  pickUpLocation = await pickUpLocation.json()
  return pickUpLocation
}
