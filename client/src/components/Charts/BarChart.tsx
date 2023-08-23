'use client'

import { useEffect, useState } from 'react'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ArcElement,
  ChartOptions,
} from 'chart.js'
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ArcElement
)

import { YearlyLaunchesDetails } from '@/types'
import { rocketColors } from '@/lib/rocketColors'
import { cn } from '@/lib/utils'

type Props = {
  yearlyLaunches: YearlyLaunchesDetails[]
}

type RocketCounts = {
  [year: number]: {
    [rocketName: string]: number
  }
}

const generateChartData = (rocketCountsByYear: any): any => {
  // It starts by extracting the years from the keys of the rocketCountsByYear object.
  const years = Object.keys(rocketCountsByYear)

  const rocketNames = Array.from(
    new Set(
      // Extracts all rocketName and count objects, e.g., {Falcon 9: 20}
      // Some values may have multiple rocket names, e.g., {Falcon 9: 20, Falcon Heavy: 1},
      // which is why using flatMap is a suitable choice here.
      // flatMap flattens nested objects, resulting in a single array.

      // Object.keys, applied after flatMap, retrieves all the keys (rocket names) from each object.
      // These keys can include repetitions, so we use 'new Set' to eliminate duplicates,
      // ensuring we have a unique list of rocket names.
      // The 'Array.from' converts the Set into an array, giving us an array of unique rocket names.
      Object.values(rocketCountsByYear).flatMap((yearData: any) =>
        Object.keys(yearData)
      )
    )
  )

  const datasets = rocketNames.map((rocketName) => ({
    label: rocketName,
    data: years.map((year) => rocketCountsByYear[year]?.[rocketName] || 0),
    backgroundColor: rocketColors[rocketName as keyof typeof rocketColors],
    barThickness: 14,
    borderWidth: 2,
    maxBarThickness: 20,
    borderColor: 'black',
  }))

  return {
    labels: years,
    datasets,
  }
}

const accumulateRocketCounts = (
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

const BarChart = ({ yearlyLaunches }: Props) => {
  const [isMediumScreen, setIsMediumScreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const setMediumScreen = () => {
      const screenWidth = window.innerWidth
      if (screenWidth >= 767) {
        setIsMediumScreen(true)
      } else {
        setIsMediumScreen(false)
      }
    }

    if (yearlyLaunches) {
      setIsLoading(false)
    }

    setMediumScreen()

    window.addEventListener('resize', setMediumScreen)

    return () => {
      window.removeEventListener('resize', setMediumScreen)
    }
  }, [yearlyLaunches])

  const rocketCountsByYear = accumulateRocketCounts(yearlyLaunches)
  const chartData = generateChartData(rocketCountsByYear)

  const options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#e2e8f0',
          font: {
            size: isMediumScreen ? 11 : 8,
          },
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: '#e2e8f0',
        },
      },
    },
  }

  return (
    <div className={cn('flex-1 rounded-md bg-card p-3 md:h-[390px] lg:h-full')}>
      <h1 className="text-center text-xl font-semibold text-slate-200 md:text-2xl">
        Lançamentos por ano
      </h1>
      <div className={cn('h-[210px] w-[250px] md:h-[424px]  md:w-full ')}>
        {isLoading ? (
          <div className="h-[210px] w-[250px] animate-pulse bg-gray-200 md:h-[288px] md:w-full" />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  )
}

export default BarChart
