import { first, last, max, min } from 'lodash'

import { slice } from 'store/metadata/slice'
import apiClient from 'serverApi/apiClient'

export const {
  addAuthor,
  setAuthors,
  setCurrentAuthorDetails,
  setTags,
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
