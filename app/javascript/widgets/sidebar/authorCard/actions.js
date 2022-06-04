import { pull } from 'lodash'
import { loadAuthorDetails } from 'store/metadata/actions'
import { selectTagBookmark, selectTagNames } from 'store/metadata/selectors'
import apiClient from 'serverApi/apiClient'

export const setupStoreForAuthorCard = (authorId) => async (dispatch) => {
  dispatch(loadAuthorDetails(authorId))
}

export const markAuthorAsBookmarked = (id, tagIds) => async (dispatch, getState) => {
  const state = getState()
  const tagBookmark = selectTagBookmark()(state)
  var tagNames = selectTagNames(tagIds)(state)
  tagNames.push(tagBookmark)
  apiClient.putAuthorDetails(id, { tagNames }).then(() =>
    dispatch(loadAuthorDetails(id))
  )
}

export const unmarkAuthorAsBookmarked = (id, tagIds) => async (dispatch, getState) => {
  const state = getState()
  const tagBookmark = selectTagBookmark()(state)
  var tagNames = selectTagNames(tagIds)(state)
  pull(tagNames, tagBookmark)
  tagNames.push('')
  apiClient.putAuthorDetails(id, { tagNames }).then(() =>
    dispatch(loadAuthorDetails(id))
  )
}
