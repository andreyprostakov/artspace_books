import { first, last, max, min } from 'lodash'

import { slice } from 'store/metadata/slice'
import { selectBook, selectCurrentBook } from 'store/metadata/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import apiClient from 'serverApi/apiClient'

export const {
  addAuthor,
  setAuthors,
  addBook,
  addBooks,
  clearBooks,
  setCurrentAuthorDetails,
  setPageIsLoading,
  setTags,
  setDefaultBookImageUrl,
  setCurrentBookDetails,
} = slice.actions

export const fetchAllTags = () => async (dispatch) => {
  const response = await apiClient.getTags()
  dispatch(setTags(response))
}

export const fetchAuthors = () => async (dispatch, getState) => {
  const response = await apiClient.getAuthors()
  dispatch(setAuthors(response))
}

export const loadAuthor = (id) => async (dispatch, getState) => {
  const author = await apiClient.getAuthor(id)
  dispatch(addAuthor(author))
}

export const loadAuthorDetails = (id) => async (dispatch, getState) => {
  const details = await apiClient.getAuthorDetails(id)
  dispatch(setCurrentAuthorDetails(details))
}

export const showBook = (bookId) => (dispatch, getState) => {
  if (!bookId) { throw('Trying to show nothing!') }

  const state = getState()
  const currentBookId = selectCurrentBookId()(state)
  const book = selectBook(bookId)(state)
  if (!book) { throw(`Book #${bookId} is missing! Cannot show it.`) }

  if (bookId != currentBookId) {
    dispatch(setCurrentBookId(bookId))
  }
}
