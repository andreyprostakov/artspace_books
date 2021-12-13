import { loadAuthorDetails } from 'store/metadata/actions'

export const setupStoreForAuthorCard = (authorId) => async (dispatch) => {
  dispatch(loadAuthorDetails(authorId))
}
