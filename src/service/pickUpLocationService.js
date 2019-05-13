import Auth from '../util/Auth'
import env from './env'

export const getAll = async () => {
  let pickUpLocations = await fetch(`${env.API_URL}/pick_up_location`)
  pickUpLocations = await pickUpLocations.json()
  return pickUpLocations
}

export const getById = async id => {
  let pickUpLocation = await fetch(`${env.API_URL}/pick_up_location/${id}`)
  pickUpLocation = await pickUpLocation.json()
  return pickUpLocation
}
