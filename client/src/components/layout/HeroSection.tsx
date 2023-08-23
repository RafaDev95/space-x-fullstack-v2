'use client'

import { useEffect, useState } from 'react'

import { PieChart, BarChart, SearchBar } from '@/components'
import {
  LaunchesOverallDetails,
  LaunchesResponse,
  YearlyLaunchesDetails,
} from '@/types'
import columns from '../DataTable/Column'
import { DataTable } from '../DataTable/Table'
import useQueryStore from '@/shared/hooks/useQueryStore'
import useLoadingStore from '@/shared/hooks/useLoadingStore'

type Props = {
  launches: LaunchesResponse | string
  yearlyLaunches: YearlyLaunchesDetails[] | string
  overall: LaunchesOverallDetails | string
}

const HeroSection = ({ launches, overall, yearlyLaunches }: Props) => {
  const { search } = useQueryStore()
  const { setIsLoading } = useLoadingStore()

  useEffect(() => {
    setIsLoading(false)
  }, [launches, search])

  return (
    <main className="mt-8 p-6">
      <div
        className="flex flex-col items-center space-y-4
      lg:h-[400px] lg:flex-row lg:items-start lg:gap-x-10 lg:space-y-0"
      >
        <PieChart overall={overall} />
        <BarChart yearlyLaunches={yearlyLaunches} />
      </div>
      <SearchBar />
      <div className="mt-8">
        <DataTable
          columns={columns}
          data={launches.results}
          hasNextPage={launches.hasNextPage}
          hasPrevPage={launches.hasPrevPage}
          totalDocs={launches.totalDocs}
        />
      </div>
    </main>
  )
}
export default HeroSection
