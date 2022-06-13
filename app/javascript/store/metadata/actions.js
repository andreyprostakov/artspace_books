import { slice } from 'store/metadata/slice'
import { selectCurrentBookId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import apiClient from 'serverApi/apiClient'

import {
  selectBook,
} from 'store/metadata/selectors'
export const {
  addBook,
  addBooks,
  clearBooks,
  setPageIsLoading,
  setTags,
  setDefaultBookImageUrl,
  setCurrentBookDetails,
} = slice.actions

export const fetchAllTags = () => async dispatch => {
  const response = await apiClient.getTags()
  dispatch(setTags(response))
}

export const showBook = bookId => (dispatch, getState) => {
  if (!bookId) throw new Error('Trying to show nothing!')

  const state = getState()
  const currentBookId = selectCurrentBookId()(state)
  const book = selectBook(bookId)(state)
  if (!book) throw new Error(`Book #${bookId} is missing! Cannot show it.`)

  if (bookId !== currentBookId) dispatch(setCurrentBookId(bookId))
}
