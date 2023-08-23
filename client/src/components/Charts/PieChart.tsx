'use client'

import { useState, useEffect } from 'react'

import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Chart as ChartJS, ChartOptions } from 'chart.js'
ChartJS.register(ChartDataLabels)

import { LaunchesOverallDetails } from '@/types'
import { rocketColors } from '@/lib/rocketColors'
import { mergeClassNames } from '@/lib/utils'

type Props = {
  overall: LaunchesOverallDetails | string
}

const options: ChartOptions<'pie'> = {
  plugins: {
    legend: {
      display: false,
    },

    datalabels: {
      color: '#e2e8f0',
      font: {
        weight: 'bold',
        size: 15,
      },
    },
  },
}

const PieChart = ({ overall }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (overall && typeof overall !== 'string') {
      setIsLoading(false)
    }
  }, [overall])

  if (typeof overall === 'string') {
    return (
      <div className="flex h-full flex-1 items-center justify-center rounded-md bg-card p-3">
        <p className=" text-red-500">{overall}</p>
      </div>
    )
  }

  const { successes, failures, rocketLaunchSummary } = overall

  const rocketNames = Object.keys(rocketLaunchSummary)
  const rocketLaunchCounts = Object.values(rocketLaunchSummary)

  const chartData = {
    labels: rocketNames,
    datasets: [
      {
        data: rocketLaunchCounts,
        backgroundColor: rocketNames?.map(
          (rocketName) => rocketColors[rocketName as keyof typeof rocketColors]
        ),
      },
    ],
  }

  return (
    <div className="h-full flex-1 rounded-md bg-card p-3 ">
      <h1 className="text-center text-xl font-semibold text-slate-200 md:text-2xl">
        Lançamentos de foguetes
      </h1>

      <div className="flex flex-col-reverse items-center gap-y-2 p-4 md:h-[335px] md:flex-row">
        <div className="flex w-full max-w-[190px] flex-col gap-y-6">
          <ul className="">
            {rocketNames?.map((rocketName) => (
              <li
                className="mt-1 flex w-full items-center gap-x-4 text-slate-200 md:text-sm"
                key={rocketName}
              >
                <div
                  className="h-4 w-6"
                  style={{
                    backgroundColor:
                      rocketColors[rocketName as keyof typeof rocketColors],
                  }}
                />
                {rocketName}
              </li>
            ))}
          </ul>
          <div className="text-slate-200">
            <h2 className="mb-2 font-bold">Resultado de lançamentos:</h2>
            <p>
              Sucesso:{' '}
              <span className="ml-1 font-semibold text-green-600">
                {successes}
              </span>
            </p>
            <p>
              Falhas:
              <span className="ml-1 font-semibold text-red-600">
                {failures}
              </span>
            </p>
          </div>
        </div>
        <div className={mergeClassNames('w-[200px] lg:w-[200px] xl:w-[300px]')}>
          {isLoading ? (
            <div
              className="h-[200px] w-[200px] animate-pulse rounded-full
             bg-gray-200 md:h-[200px] md:w-[200px] xl:h-[300px] xl:w-[300px]"
            />
          ) : (
            <Pie data={chartData} options={options} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PieChart
