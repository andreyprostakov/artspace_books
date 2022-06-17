import { selectCurrentBookId } from 'store/axis/selectors'

const localState = state => state.storeBooks

export const selectBookDefaultImageUrl = () => state => localState(state).defaultCoverUrl

export const selectCurrentBookDetails = () => state => localState(state).bookDetailsCurrent

export const selectBooksIndexEntry = id => state => localState(state).booksIndex[id]

export const selectBooksIndex = () => state => Object.values(localState(state).booksIndex)

export const selectCurrentBook = () => state => {
  const id = selectCurrentBookId()(state)
  return selectBooksIndexEntry(id)(state)
}

export const selectBookPopularities = ids => state => ids.map(id => selectBooksIndexEntry(id)(state)?.popularity)
