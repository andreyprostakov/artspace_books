import { fetchTagsRefs } from 'store/tags/actions'

export const setupStoreForTagsPage = () => dispatch => {
  dispatch(fetchTagsRefs())
}
