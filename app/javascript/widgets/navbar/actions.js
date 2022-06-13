import { slice } from 'widgets/navbar/slice'
import { selectAuthorsRefsLoaded } from 'store/authors/selectors'
import { fetchAuthorsRefs } from 'store/authors/actions'
import { selectTagsRefsLoaded } from 'store/tags/selectors'
import { fetchTagsRefs } from 'store/tags/actions'

export const {
  setAuthorsSearchKey,
  setTagsSearchKey,
} = slice.actions

export const prepareNavRefs = () => (dispatch, getState) => {
  const state = getState()

  const tagsLoaded = selectTagsRefsLoaded()(state)
  if (!tagsLoaded) dispatch(fetchTagsRefs())

  const authorsLoaded = selectAuthorsRefsLoaded()(state)
  if (!authorsLoaded) dispatch(fetchAuthorsRefs())
}
