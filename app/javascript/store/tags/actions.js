import { slice } from 'store/tags/slice'
import apiClient from 'store/tags/apiClient'

export const { assignTagsRefs } = slice.actions

export const fetchTagsRefs = () => async dispatch => {
  const tagsRefs = await apiClient.getTagsRefs()
  dispatch(assignTagsRefs(tagsRefs))
}
