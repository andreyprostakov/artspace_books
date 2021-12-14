import {
  fetchAuthors,
  fetchAllTags,
  loadAuthorDetails
} from 'store/metadata/actions'

export const setupStoreForPage = () => async (dispatch, getState) => {
  dispatch(fetchAllTags())
  dispatch(fetchAuthors())
}
