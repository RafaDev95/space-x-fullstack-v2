import { Prisma } from '@prisma/client'

type SmartWhere = Prisma.LaunchWhereInput & { OR?: Array<Prisma.LaunchWhereInput> }

export function buildSmartWhere(search: string | undefined): SmartWhere {
  let smartWhere: SmartWhere = {}

  if (search === 'undefined') {
    return {}
  }

  if (search === 'true' || search === 'false') {
    smartWhere.success = search === 'true'
  } else if (search) {
    smartWhere.OR = [
      {
        name: {
          contains: search.trim(),
          mode: 'insensitive',
        },
      },
      {
        rocket_data: {
          name: {
            contains: search.trim(),
            mode: 'insensitive',
          },
        },
      },
    ]
  }

  console.log(smartWhere)

  return smartWhere
}

export function calculatePagination(page: number, limit: number, totalItems: number) {
  const itemsPerPage = limit || 5
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const offset = (page - 1) * itemsPerPage

  return {
    itemsPerPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    offset,
  }
}
