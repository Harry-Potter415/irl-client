import { isNotEmpty } from 'shopjs/helpers'

// Build sort request params
export const buildSortObject = (params, sortField) => {
  switch (sortField) {
    case 'popular':
      params.reverse = true
      params.sortKey = 'BEST_SELLING'
      break
    case 'price_desc':
      params.reverse = true
      params.sortKey = 'PRICE'
      break
    case 'price_asc':
      params.sortKey = 'PRICE'
      break
    default:
      params.reverse = true
      params.sortKey = 'CREATED_AT'
      break
  }

  return params
}

const buildFilter = (key, value) => {
  // handle range
  if (value.indexOf('range') >= 0) {
    const range = value.split(':')[1].split('-')
    return `${key}:>=${range[0]} ${key}:<${range[1]}`
  } else {
    return `${key}:${value}`
  }
}

// Build query request params
export const buildQueryObject = (params, queryParams) => {
  let query = ''
  // Filter by text match
  const keys = ['title']
  // Filter by tag value
  const tags = ['size', 'color']

  Object.keys(queryParams).forEach(param => {
    // Append rule
    if (isNotEmpty(query)) query += ' AND '

    // Default filter
    let filter = buildFilter(param, queryParams[param])

    if (keys.includes(param)) {
      // Filter by prop name
      filter = `${param}:${queryParams[param]}*`
    } else if (tags.includes(param)) {
      // Filter by tag value
      filter = `tag:${queryParams[param]}`
    }

    // Concat filter rules
    query += filter
  })

  return { ...params, query }
}
