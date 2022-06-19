import { slice } from 'store/tags/slice'
import apiClient from 'store/tags/apiClient'

export const { assignTagsIndex, assignTagsRefs } = slice.actions

export const fetchTagsIndex = () => async dispatch => {
  const tagsRefs = await apiClient.getTagsIndex()
  dispatch(assignTagsIndex(tagsRefs))
}

export const fetchTagsRefs = () => async dispatch => {
  const tagsRefs = await apiClient.getTagsRefs()
  dispatch(assignTagsRefs(tagsRefs))
}
