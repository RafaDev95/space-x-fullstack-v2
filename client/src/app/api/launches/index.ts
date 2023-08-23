import { LaunchesOverallDetails, LaunchesResponse } from '@/types'

export const getLaunches = async (
  page = '1',
  limit = '5',
  search?: string
): Promise<LaunchesResponse | string> => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    search: search || '',
  })

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/launches?${queryParams.toString()}`

  try {
    const res = await fetch(url)

    const data = await res.json()

    if (!res.ok) {
      throw new Error(`Requisição falhou com status: ${res.status}`)
    }
    return data
  } catch (error) {
    console.error(error)
    return 'Algo deu errado na busca pelos dados.'
  }
}

export const getOverallDetails = async (): Promise<
  LaunchesOverallDetails | string
> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/launches/stats/overall`,
    { cache: 'no-store' }
  )

  try {
    const data = await res.json()
    if (!res.ok) {
      throw new Error(`Requisição falhou com status: ${res.status}`)
    }
    return data
  } catch (error) {
    console.error(error)
    return 'Algo deu errado na busca pelos dados.'
  }
}
