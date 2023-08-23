import { LaunchesDetails, RocketLaunchSummary } from '@/types'

export const calculateRocketUsageAndLaunchCounts = (yearlyLaunches: LaunchesDetails[]) => {
  const rocketLaunchSummary: RocketLaunchSummary = {}

  yearlyLaunches.forEach((launch) => {
    const rocketName = launch.rocket_data!.name
    const cores = launch.cores

    if (cores.length === 0) {
      // Rocket was used
      const rocketKey = `Used ${rocketName}`
      if (!rocketLaunchSummary[rocketKey]) {
        rocketLaunchSummary[rocketKey] = 1
      } else {
        rocketLaunchSummary[rocketKey]++
      }
    } else {
      cores.forEach((core) => {
        const isReused = core.reused || false
        const isFalconNine = rocketName.includes('9')
        const rocketKey = isReused
          ? `Used ${rocketName}`
          : isFalconNine
          ? `New ${rocketName}`
          : rocketName

        if (!rocketLaunchSummary[rocketKey]) {
          rocketLaunchSummary[rocketKey] = 1
        } else {
          rocketLaunchSummary[rocketKey]++
        }
      })
    }
  })

  return rocketLaunchSummary
}
