import { selectCurrentBookId } from 'store/axis/selectors'

const localState = state => state.metadata

export const selectPageIsLoading = () => state => localState(state).pageIsLoading

export const selectBookDefaultImageUrl = () => state => localState(state).defaultCoverUrl

export const selectCurrentBookDetails = () => state => localState(state).bookDetailsCurrent

export const selectBook = id => state => localState(state).booksIndexed[id]

export const selectBooks = () => state => Object.values(localState(state).booksIndexed)

export const selectCurrentBook = () => state => {
  const id = selectCurrentBookId()(state)
  return selectBook(id)(state)
}

export const selectBookPopularities = ids => state => ids.map(id => selectBook(id)(state)?.popularity)
