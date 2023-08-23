import HeroSection from '@/components/layout/HeroSection'
import { fetchLaunches, fetchOverallDetails } from './api/launches'

import { fetchYearlyLaunches } from './api/launches/cached/fetchYearlyLaunches'

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page: string; search: string }
}) => {
  const launches = await fetchLaunches(
    searchParams.page,
    '5',
    searchParams.search
  )
  const yearlyLaunches = await fetchYearlyLaunches()
  const overallLaunchesDetails = await fetchOverallDetails()

  return (
    <HeroSection
      launches={launches}
      overall={overallLaunchesDetails}
      yearlyLaunches={yearlyLaunches}
    />
  )
}
export default HomePage
