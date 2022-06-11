import { fetchAllTags } from 'store/metadata/actions'

export const setupStoreForTagsPage = () => dispatch => {
  dispatch(fetchAllTags())
}
