import axios, { AxiosResponse } from 'axios'
import { RocketFromSpaceX } from './types/spacex'

export const getRocketData = async (rocketId: string) => {
  try {
    const rocketData: AxiosResponse<RocketFromSpaceX> = await axios.get(
      `https://api.spacexdata.com/v4/rockets/${rocketId}`
    )
    return rocketData.data
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong while fetching data')
  }
}
