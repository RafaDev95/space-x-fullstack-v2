import { Request, Response, Router } from 'express'

import { Controller, RocketLaunchSummary } from '@/types'
import { Prisma } from '@prisma/client'
import prismadb from '@/lib/prismadb'
import { calculateRocketUsageAndLaunchCounts } from './LaunchServices'

type SmartWhere = Prisma.LaunchWhereInput & { OR?: Array<Prisma.LaunchWhereInput> }

class LaunchController implements Controller {
  public path = '/launches'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.getLaunches)
    this.router.get(`${this.path}/stats/yearly`, this.getYearlyLaunches)
    this.router.get(`${this.path}/stats/overall`, this.getOverallDetails)
  }

  async getLaunches(req: Request, res: Response) {
    const { page, limit, search } = req.query

    try {
      const pageNumber = Number(page) || 1
      const itemsPerPage = Number(limit) || 5

      let smartWhere: SmartWhere = {}

      if (search === 'true' || search === 'false') {
        smartWhere.success = search === 'true'
      } else if (search) {
        smartWhere.OR = [
          {
            name: {
              contains: (search as string).trim(),
              mode: 'insensitive',
            },
          },
          {
            rocket_data: {
              name: {
                contains: (search as string).trim(),
                mode: 'insensitive',
              },
            },
          },
        ]
      }

      const totalLaunches = await prismadb.launch.findMany({
        where: smartWhere,
      })

      const totalItems = totalLaunches.length
      const totalPages = Math.ceil(totalItems / itemsPerPage)

      const hasNextPage = pageNumber < totalPages
      const hasPrevPage = pageNumber > 1

      const offset = (pageNumber - 1) * itemsPerPage

      const results = await prismadb.launch.findMany({
        skip: offset,
        take: itemsPerPage,

        include: {
          links: {
            include: {
              patch: true,
            },
          },
          rocket_data: {
            select: {
              name: true,
            },
          },
          cores: true,
        },
        where: smartWhere,
      })

      if (results.length === 0 && search) {
        res.status(404).json({
          message: 'No results found',
        })
      } else {
        res
          .json({
            results,
            totalDocs: totalItems - pageNumber * itemsPerPage,
            page: pageNumber,
            totalPages,
            hasNextPage,
            hasPrevPage,
          })
          .status(200)
      }
    } catch (error) {
      res.status(400).json({
        message: 'Failed to retrieve launches',
      })
    }
  }

  async getYearlyLaunches(req: Request, res: Response) {
    const { year } = req.query

    try {
      let launchYears: number[] = []

      if (year) {
        launchYears.push(Number(year))
      } else {
        // Fetch all unique years available in the database
        const allLaunchYears = await prismadb.launch.findMany({
          distinct: ['date_local'],
          select: {
            date_local: true,
          },
        })

        //Ignoring the days and months, storing only the year. e.g: 2020
        launchYears = allLaunchYears.map((launch) => launch.date_local.getFullYear())
      }

      const yearlySummaries: {
        [year: number]: {
          successes: number
          failures: number
          rocketLaunchSummary: {
            rocketName: string
            count: number
          }[]
        }
      } = {}

      // Fetch data for each year concurrently
      await Promise.all(
        launchYears.map(async (year) => {
          const yearlyLaunches = await prismadb.launch.findMany({
            where: {
              date_local: {
                lte: new Date(`${year}-12-31`),
                gte: new Date(`${year}-01-01`),
              },
            },
            select: {
              rocket_data: true,
              success: true,
              name: true,
              cores: true,
            },
          })

          const successes = yearlyLaunches.filter((launch) => launch.success).length
          const failures = yearlyLaunches.filter((launch) => !launch.success).length

          const rocketLaunchSummary: { [rocketName: string]: number } =
            calculateRocketUsageAndLaunchCounts(yearlyLaunches)

          const rocketLaunchSummaryArray = Object.keys(rocketLaunchSummary).map((rocketName) => {
            return { rocketName, count: rocketLaunchSummary[rocketName] }
          })

          yearlySummaries[year] = {
            successes,
            failures,
            rocketLaunchSummary: rocketLaunchSummaryArray,
          }
        })
      )

      //Converted to an array
      const parsedYearlySummary = Object.entries(yearlySummaries).map(([year, infos]) => ({
        year,
        infos,
      }))

      res.json(parsedYearlySummary)
    } catch (error) {
      res.status(400).json({
        message: 'Failed to retrieve yearly launches',
      })
    }
  }

  async getOverallDetails(req: Request, res: Response) {
    try {
      const launchesDetails = await prismadb.launch.findMany({
        select: {
          success: true,
          rocket_data: true,
          cores: true,
        },
      })

      const successes = launchesDetails.filter((launch) => launch.success).length
      const failures = launchesDetails.filter((launch) => launch.success === false).length

      const rocketLaunchSummary: { [rocketName: string]: number } =
        calculateRocketUsageAndLaunchCounts(launchesDetails)

      // res.json({
      //   successes,
      //   failures,
      //   rocketLaunchSummary,
      // })
      res.status(400).json({ message: 'error' })
    } catch (error) {
      res.status(400).json({
        message: 'Failed to retrieve launches details',
      })
    }
  }
}

const launchController = new LaunchController()

export default launchController
