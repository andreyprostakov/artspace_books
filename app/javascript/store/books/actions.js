import { slice } from 'store/books/slice'
import { selectCurrentBookId } from 'store/axis/selectors'
import { setRequestedBookId } from 'widgets/booksListYearly/actions'

import {
  selectBooksIndexEntry,
} from 'store/books/selectors'
export const {
  addBook,
  addBooks,
  clearBooks,
  setPageIsLoading,
  setDefaultBookImageUrl,
  setCurrentBookDetails,
} = slice.actions

export const showBook = bookId => (dispatch, getState) => {
  if (!bookId) throw new Error('Trying to show nothing!')

  const state = getState()
  const currentBookId = selectCurrentBookId()(state)
  const book = selectBooksIndexEntry(bookId)(state)
  if (!book) throw new Error(`Book #${bookId} is missing! Cannot show it.`)

  if (bookId !== currentBookId) dispatch(setRequestedBookId(bookId))
}
