import { slice } from 'store/authors/slice'
import apiClient from 'store/authors/apiClient'

import { setCurrentAuthorId } from 'store/axis/actions'
import {
  selectAuthorFull,
  selectAuthorIndexEntry,
  selectAuthorRef,
} from 'store/authors/selectors'
export const {
  addAuthorFull,
  addAuthorIndexEntry,
  addAuthorRef,
  assignAuthorsIndex,
  assignAuthorsRefs,
} = slice.actions

export const fetchAuthorsRefs = () => async dispatch => {
  const authorRefs = await apiClient.getAuthorsRefs()
  dispatch(assignAuthorsRefs(authorRefs))
}

export const fetchAuthorsIndex = () => async dispatch => {
  const authorIndex = await apiClient.getAuthorsIndex()
  dispatch(assignAuthorsIndex(authorIndex))
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

export const reloadAuthor = id => (dispatch, getState) => {
  const state = getState()
  const oldFull = selectAuthorFull()(state)
  if (oldFull) dispatch(fetchAuthorFull(id))

  const oldIndexEntry = selectAuthorIndexEntry()(state)
  if (oldIndexEntry) dispatch(fetchAuthorIndexEntry(id))

  const oldRef = selectAuthorRef()(state)
  if (oldRef) dispatch(fetchAuthorRef(id))

  dispatch(setCurrentAuthorId(null))
  dispatch(setCurrentAuthorId(id))
}
