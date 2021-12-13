import { fetchAuthors, loadAuthorDetails } from 'store/metadata/actions'

export const setupStoreForPage = () => async (dispatch, getState) => {
  dispatch(fetchAuthors())
}
