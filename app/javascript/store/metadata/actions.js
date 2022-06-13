import { slice } from 'store/metadata/slice'
import { selectCurrentBookId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import apiClient from 'serverApi/apiClient'

import {
  selectAuthorFull,
  selectAuthorIndexEntry,
  selectAuthorRef,
  selectBook,
} from 'store/metadata/selectors'
export const {
  addAuthorFull,
  addAuthorIndexEntry,
  addAuthorRef,
  assignAuthorsIndex,
  assignAuthorsRefs,
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

export const fetchAuthorsRefs = () => async dispatch => {
  const authorRefs = await apiClient.getAuthorsRefs()
  dispatch(assignAuthorsRefs(authorRefs))
}

export const fetchAuthorsIndex = () => async dispatch => {
  const authorIndex = await apiClient.getAuthorsIndex()
  dispatch(assignAuthorsIndex(authorIndex))
}

export const reloadAuthor = id => (dispatch, getState) => {
  const state = getState()
  const oldFull = selectAuthorFull()(state)
  if (oldFull) dispatch(fetchAuthorFull(id))

  const oldIndexEntry = selectAuthorIndexEntry()(state)
  if (oldIndexEntry) dispatch(fetchAuthorIndexEntry(id))

  const oldRef = selectAuthorRef()(state)
  if (oldRef) dispatch(fetchAuthorRef(id))
}

export const fetchAuthorFull = id => async dispatch => {
  const authorFull = await apiClient.getAuthorFull(id)
  dispatch(addAuthorFull(authorFull))
}

export const fetchAuthorIndexEntry = id => async dispatch => {
  const authorIndexEntry = await apiClient.getAuthorIndexEntry(id)
  dispatch(addAuthorIndexEntry(authorIndexEntry))
}

export const fetchAuthorRef = id => async dispatch => {
  const authorRef = await apiClient.getAuthorRef(id)
  dispatch(addAuthorRef(authorRef))
}

export const showBook = bookId => (dispatch, getState) => {
  if (!bookId) throw new Error('Trying to show nothing!')

  const state = getState()
  const currentBookId = selectCurrentBookId()(state)
  const book = selectBook(bookId)(state)
  if (!book) throw new Error(`Book #${bookId} is missing! Cannot show it.`)

  if (bookId !== currentBookId) dispatch(setCurrentBookId(bookId))
}
