import HeroSection from '@/components/layout/HeroSection'
import { getLaunches, getOverallDetails } from './api/launches'

import { getYearlyLaunches } from './api/launches/cached/getYearlyLaunches'

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page: string; search: string }
}) => {
  const launches = await getLaunches(
    searchParams.page,
    '5',
    searchParams.search
  )
  const yearlyLaunches = await getYearlyLaunches()
  const overallLaunchesDetails = await getOverallDetails()

  return (
    <HeroSection
      launches={launches}
      overall={overallLaunchesDetails}
      yearlyLaunches={yearlyLaunches}
    />
  )
}
export default HomePage
