import { pick } from 'lodash'
import { selectCurrentAuthorId, selectCurrentBookId } from 'store/axis/selectors'

const localState = state => state.metadata

export const selectAuthor = id => state => localState(state).authorsIndexed[id]

export const selectAuthors = () => state => Object.values(localState(state).authorsIndexed)

export const selectCurrentAuthorDetails = () => state => localState(state).authorDetailsCurrent

export const selectCurrentAuthor = () => state => selectAuthor(selectCurrentAuthorId()(state))(state)

export const selectAllTags = () => state => Object.values(localState(state).tagsIndexed)

export const selectPageIsLoading = () => state => localState(state).pageIsLoading

export const selectTag  = (id) => state => localState(state).tagsIndexed[id]

export const selectTagBookmark = () => () => 'BookmarkedByA'

export const selectTagIdBookmark = () => state => selectAllTags()(state).find(tag => tag.name == 'BookmarkedByA')?.id

export const selectTagRead = () => () => 'ReadByA'

export const selectTagIdRead = () => state => selectAllTags()(state).find(tag => tag.name == 'ReadByA')?.id

export const selectTagNames = (ids) => state => selectTags(ids)(state).map(tag => tag.name)

export const selectTags = (ids) => state => Object.values(pick(localState(state).tagsIndexed, ids))

export const selectVisibleTags = (tags) => state => {
  const tagBookmark = selectTagBookmark()(state)
  const tagRead = selectTagRead()(state)
  return tags.filter((tag) => ![tagBookmark, tagRead].includes(tag.name))
}

export const selectBookDefaultImageUrl = () => state => localState(state).defaultCoverUrl

export const selectCurrentBookDetails = () => state => localState(state).bookDetailsCurrent

export const selectBook = id => state => localState(state).booksIndexed[id]

export const selectBooks = () => state => Object.values(localState(state).booksIndexed)

export const selectCurrentBook = () => state => {
  const id = selectCurrentBookId()(state)
  return selectBook(id)(state)
}

export const selectBookPopularities = (ids) => state => ids.map(id => selectBook(id)(state)?.popularity)
