import { fetchAuthors, loadAuthorDetails } from 'store/actions'
import { slice } from 'store/authorsList/slice'
import apiClient from 'serverApi/apiClient'
import orders from 'store/authorsList/sortOrders'

export const {
  setSortOrder,
} = slice.actions

export const setupStoreForPage = () => async (dispatch, getState) => {
  dispatch(fetchAuthors())
  dispatch(setSortOrder(orders.BY_NAME_ASCENDING))
}

export const setupStoreForAuthorCard = (authorId) => async (dispatch) => {
  dispatch(loadAuthorDetails(authorId))
}
