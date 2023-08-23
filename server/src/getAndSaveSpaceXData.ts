import axios, { AxiosResponse } from 'axios'
import prismadb from './lib/prismadb'
import { LaunchFromSpaceX, RocketFromSpaceX } from './types/spacex'

const prisma = prismadb

export const getAndSaveSpaceXData = async () => {
  try {
    const launchesResponse: AxiosResponse<LaunchFromSpaceX[]> = await axios.get(
      'https://api.spacexdata.com/v5/launches'
    )
    const launches = launchesResponse.data

    const getRocketData = async (rocketId: string) => {
      const rocketData: AxiosResponse<RocketFromSpaceX> = await axios.get(
        `https://api.spacexdata.com/v4/rockets/${rocketId}`
      )

      return rocketData.data
    }

    for (const launch of launches) {
      const existingLaunch = await prisma.launch.findFirst({
        where: {
          flight_number: launch.flight_number,
        },
      })

      if (!existingLaunch) {
        const rocketId = launch.rocket
        const rocketData = await getRocketData(rocketId)

        const createdLaunch = await prisma.launch.create({
          data: {
            date_unix: launch.date_unix,
            date_utc: launch.date_utc,
            date_local: launch.date_local,
            date_precision: launch.date_precision,
            flight_number: launch.flight_number,
            rocket: launch.rocket,
            success: launch.success,
            upcoming: launch.upcoming,
            details: launch.details,
            name: launch.name,
            rocket_data: {
              create: {
                name: rocketData.name,
              },
            },
            links: {
              create: {
                webcast: launch.links.webcast,
                patch: {
                  create: {
                    large: launch.links.patch.large,
                    small: launch.links.patch.small,
                  },
                },
              },
            },
          },
          include: {
            cores: true,
          },
        })

        for (const core of launch.cores) {
          const existingCore = await prisma.core.findFirst({
            where: {
              launchId: createdLaunch.id,
            },
          })

          if (existingCore) {
            await prisma.core.update({
              where: {
                id: existingCore.id,
              },
              data: {
                reused: core.reused,
              },
            })
          } else {
            await prisma.core.create({
              data: {
                reused: core.reused,
                launch: {
                  connect: { id: createdLaunch.id },
                },
              },
            })
          }
        }
      }
    }
  } catch (error) {
    console.error('Error loading SpaceX data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

getAndSaveSpaceXData()
