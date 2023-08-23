export const fetchYearlyLaunches = async (year?: string) => {
  let query = ''

  try {
    if (year) {
      query = `?year=${year}`
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/launches/stats/yearly${query}`,
      { next: { revalidate: 86400 } }
    )

    if (!res.ok) {
      throw new Error(`Requisição falhou com status: ${res.status}`)
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)
    return 'Algo deu errado na busca pelos dados.'
  }
}
