import { sortBy } from 'lodash'
import { selectAuthors } from 'store/selectors'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import orders from 'store/authorsList/sortOrders'

export const selectSortOrder = () => state => state.authorsList.sortOrder

export const selectSortedAuthors = () => state => {
  const order = selectSortOrder()(state)
  const attribute = selectSortAttribute()(state)
  var authors = sortBy(selectAuthors()(state), attribute)
  if ([orders.BY_NAME_DESCENDING, orders.BY_RANK_DESCENDING, orders.BY_YEAR_DESCENDING].includes(order)) {
    return authors.reverse()
  }
  return authors
}

export const selectSortAttribute = () => state => {
  const order = selectSortOrder()(state)
  switch (order) {
    case orders.BY_NAME_ASCENDING: case orders.BY_NAME_DESCENDING: return 'fullname'; break;
    case orders.BY_RANK_ASCENDING: case orders.BY_RANK_DESCENDING: return 'rank'; break;
    case orders.BY_YEAR_ASCENDING: case orders.BY_YEAR_DESCENDING: return 'birthYear'; break;
    default: return 'fullname'
  }
}

export const selectLeftSidebarShown = () => state => !!selectCurrentAuthorId()(state)
