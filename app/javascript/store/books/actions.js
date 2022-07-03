import { slice } from 'store/books/slice'
import { selectCurrentBookId } from 'store/axis/selectors'
import { setRequestedBookId } from 'widgets/booksListYearly/actions'

import {
  selectBookRef,
} from 'store/books/selectors'
export const {
  addBook,
  addBooks,
  addBooksRefs,
  setDefaultBookImageUrl,
  setCurrentBookDetails,
} = slice.actions

export const showBook = bookId => (dispatch, getState) => {
  if (!bookId) throw new Error('Trying to show nothing!')

  const state = getState()
  const currentBookId = selectCurrentBookId()(state)
  const bookRef = selectBookRef(bookId)(state)
  if (!bookRef) throw new Error(`Book #${bookId} is missing! Cannot show it.`)

  if (bookId !== currentBookId) {
    console.log(['books/actions.showBook bookid', bookId, 'currentBookId', currentBookId])
    dispatch(setRequestedBookId(bookId))
  }
}
