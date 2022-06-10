import {
  fetchAuthors,
  fetchAllTags,
} from 'store/metadata/actions'
import { slice } from 'pages/authorsPage/slice'

export const setupStoreForPage = () => async dispatch => {
  dispatch(fetchAllTags())
  dispatch(fetchAuthors())
}

export const {
  addId,
  removeId,
  setBatchMode,
} = slice.actions
