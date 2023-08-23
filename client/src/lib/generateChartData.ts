import { rocketColors } from './rocketColors'

export const generateChartData = (rocketCountsByYear: any): any => {
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
