import { Prisma } from '@prisma/client'
import { LaunchesDetails, RocketLaunchSummary } from '@/types'

type SmartWhere = Prisma.LaunchWhereInput & { OR?: Array<Prisma.LaunchWhereInput> }

export function buildSmartWhere(search: string | undefined): SmartWhere {
  let smartWhere: SmartWhere = {}

  if (search === 'undefined') {
    return {}
  }

  if (search === 'true' || search === 'false') {
    smartWhere.success = search === 'true'
  } else if (search) {
    smartWhere.OR = [
      {
        name: {
          contains: search.trim(),
          mode: 'insensitive',
        },
      },
      {
        rocket_data: {
          name: {
            contains: search.trim(),
            mode: 'insensitive',
          },
        },
      },
    ]
  }

  console.log(smartWhere)

  return smartWhere
}

export function calculatePagination(page: number, limit: number, totalItems: number) {
  const itemsPerPage = limit || 5
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const offset = (page - 1) * itemsPerPage

  return {
    itemsPerPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    offset,
  }
}

export const calculateRocketUsageAndLaunchCounts = (yearlyLaunches: LaunchesDetails[]) => {
  const rocketLaunchSummary: RocketLaunchSummary = {}

  const incrementRocketLaunchSummary = (rocketKey: string) => {
    if (!rocketLaunchSummary[rocketKey]) {
      rocketLaunchSummary[rocketKey] = 1
    } else {
      rocketLaunchSummary[rocketKey]++
    }
  }

  yearlyLaunches.forEach((launch) => {
    const rocketName = launch.rocket_data!.name
    const cores = launch.cores

    if (cores.length === 0) {
      // Rocket was used
      const rocketKey = `Used ${rocketName}`
      incrementRocketLaunchSummary(rocketKey)
    } else {
      cores.forEach((core) => {
        // this || false was necessary because some of core.reused value is null
        // and it was being ignored in the final calculation.
        const isReused = core.reused || false
        const isFalconNine = rocketName.includes('9')
        const rocketKey = isReused
          ? `Used ${rocketName}`
          : isFalconNine
          ? `New ${rocketName}`
          : rocketName

        incrementRocketLaunchSummary(rocketKey)
      })
    }
  })

  return rocketLaunchSummary
}
