import { pick } from 'lodash'
import { selectCurrentAuthorId } from 'store/axis/selectors'

export const selectAuthor = id => state => state.metadata.authorsIndexed[id]

export const selectAuthors = () => state => Object.values(state.metadata.authorsIndexed)

export const selectCurrentAuthorDetails = () => state => state.metadata.authorDetailsCurrent

export const selectCurrentAuthor = () => state => selectAuthor(selectCurrentAuthorId()(state))(state)

export const selectAllTags = () => state => Object.values(state.metadata.tagsIndexed)

export const selectPageIsLoading = () => state => state.metadata.pageIsLoading

export const selectTag  = (id) => state => state.metadata.tagsIndexed[id]

export const selectTagBookmark = () => state => 'BookmarkedByA'

export const selectTagRead = () => state => 'ReadByA'

export const selectTagNames = (ids) => state => selectTags(ids)(state).map(tag => tag.name)

export const selectTags = (ids) => state => Object.values(pick(state.metadata.tagsIndexed, ids))

export const selectVisibleTags = (tags) => state => {
  const tagBookmark = selectTagBookmark()(state)
  const tagRead = selectTagRead()(state)
  return tags.filter((tag) => ![tagBookmark, tagRead].includes(tag.name))
}
