import cron from 'node-cron'

import { getAndSaveSpaceXData } from './getAndSaveSpaceXData'

cron.schedule('0 9 * * *', async () => {
  try {
    console.log('Initiating search and data storage...')
    await getAndSaveSpaceXData()
    console.log('Success')
  } catch (error) {
    console.error('Something went worng:', error)
  }
})
