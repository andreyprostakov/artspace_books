import { slice } from 'widgets/navbar/slice'
import { selectAuthorsRefsLoaded } from 'store/authors/selectors'
import { fetchAuthorsRefs } from 'store/authors/actions'
import { fetchAllTags } from 'store/metadata/actions'

export const {
  setAuthorsSearchKey,
  setTagsSearchKey,
} = slice.actions

export const prepareNavRefs = () => (dispatch, getState) => {
  dispatch(fetchAllTags())
  const authorsLoaded = selectAuthorsRefsLoaded()(getState())
  if (!authorsLoaded) dispatch(fetchAuthorsRefs())
}
