import { RocketCounts, YearlyLaunchesDetails } from '@/types'

// return the all years and the rocket names with the quantity of launches that each had
// Example: {2022:{Used Falcon:2, New Falcon:1, Falcon Heavy:1}, ...}
export const accumulateRocketCounts = (
  yearlyLaunches: YearlyLaunchesDetails[]
): RocketCounts => {
  return yearlyLaunches?.reduce((accumulator, yearData) => {
    const year = yearData.year

    yearData?.infos.rocketLaunchSummary.forEach((rocketData) => {
      const { rocketName, count } = rocketData

      if (!accumulator[year]) {
        accumulator[year] = {}
      }

      if (!accumulator[year][rocketName]) {
        accumulator[year][rocketName] = 0
      }

      accumulator[year][rocketName] += count
    })

    return accumulator
  }, {} as RocketCounts)
}
