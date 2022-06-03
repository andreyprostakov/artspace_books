import { first, last } from 'lodash'
import apiClient from 'serverApi/apiClient'
import { addBooks } from 'widgets/booksList/actions'
import { selectCurrentBook } from 'widgets/booksList/selectors'
import { setNextBookId } from 'widgets/booksList/actions'
import { selectBookIds } from 'widgets/booksListLinear/selectors'
import { slice } from 'widgets/booksListLinear/slice'
import { pickNearEntries } from 'utils/pickNearEntries'

const { assignBooks } = slice.actions

export const fetchBooks = (query) => (dispatch) => {
  return apiClient.getBooks(query).then((books) => {
    dispatch(addBooks(books))
    dispatch(assignBooks(books))
    dispatch(setNextBookId(books[0]?.id))
  })
}

export const shiftSelection = (shift) => (dispatch, getState) => {
  const state = getState()
  const currentBook = selectCurrentBook()(state)
  const allBookIds = selectBookIds()(state)
  const displayedBookIds = pickNearEntries(allBookIds, currentBook.id, { lengthBefore: 1, lengthAfter: 1 })
  const targetId = shift > 0 ? last(displayedBookIds) : first(displayedBookIds)
  if (!targetId) { return }

  dispatch(setNextBookId(targetId))
}

export const setupBooksListSelection = (bookId) => (dispatch, getState) => {
  const state = getState()
  const currentBook = bookId && selectBook(bookId)(state)
  if (currentBook) {
    dispatch(showBook(bookId))
  } else {
    const id = selectBookIds()(state)[0]
    dispatch(setNextBookId(id))
  }
}
