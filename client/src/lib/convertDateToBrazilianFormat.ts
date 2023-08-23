import { format } from 'date-fns'

export const convertDate = (date: Date | string) => {
  const parsedData = format(new Date(date), 'dd/MM/yyyy')

  return parsedData
}
