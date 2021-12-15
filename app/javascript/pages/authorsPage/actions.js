import {
  fetchAuthors,
  fetchAllTags,
  loadAuthorDetails
} from 'store/metadata/actions'
import { slice } from 'pages/authorsPage/slice'

export const setupStoreForPage = () => async (dispatch, getState) => {
  dispatch(fetchAllTags())
  dispatch(fetchAuthors())
}

export const {
  addId,
  removeId,
  setBatchMode,
} = slice.actions
