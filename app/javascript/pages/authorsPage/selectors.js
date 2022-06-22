import { sortBy } from 'lodash'

import { selectAuthorsIndex } from 'store/authors/selectors'
import orders from 'pages/authorsPage/sortOrders'

export const selectSortedAuthors = order => state => {
  const attribute = selectSortAttribute(order)(state)
  const authors = sortBy(selectAuthorsIndex()(state), attribute)
  if ([orders.BY_NAME_DESCENDING, orders.BY_RANK_DESCENDING, orders.BY_YEAR_DESCENDING].includes(order))
    return authors.reverse()
  return authors
}

export const selectSortAttribute = order => () => {
  switch (order) {
  case orders.BY_NAME_ASCENDING: case orders.BY_NAME_DESCENDING: return 'fullname'
  case orders.BY_RANK_ASCENDING: case orders.BY_RANK_DESCENDING: return 'rank'
  case orders.BY_YEAR_ASCENDING: case orders.BY_YEAR_DESCENDING: return 'birthYear'
  default: return 'fullname'
  }
}
