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

import { RocketCounts, YearlyLaunchesDetails } from '@/types'
import { cn } from '@/lib/utils'
import { generateChartData } from '@/lib/generateChartData'
import { accumulateRocketCounts } from '@/lib/accumulateRocketCounts'

type Props = {
  yearlyLaunches: YearlyLaunchesDetails[]
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
