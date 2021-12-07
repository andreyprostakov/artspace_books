import { fetchAuthors, loadAuthorDetails } from 'store/actions'

export const setupStoreForPage = () => async (dispatch, getState) => {
  dispatch(fetchAuthors())
}

export const setupStoreForAuthorCard = (authorId) => async (dispatch) => {
  dispatch(loadAuthorDetails(authorId))
}
