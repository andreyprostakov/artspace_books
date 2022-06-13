import { fetchAuthorsIndex } from 'store/authors/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'
import { slice } from 'pages/authorsPage/slice'

export const {
  addId,
  removeId,
  setBatchMode,
} = slice.actions

export const setupStoreForPage = () => dispatch => {
  dispatch(prepareNavRefs())
  dispatch(fetchAuthorsIndex())
}
