import { first, last } from 'lodash'
import apiClient from 'serverApi/apiClient'
import { addBooks } from 'widgets/booksList/actions'
import { setCurrentBookId } from 'store/axis/actions'
import { selectBook, selectCurrentBook } from 'widgets/booksList/selectors'
import { showBook } from 'widgets/booksList/actions'
import { pickNearEntries } from 'utils/pickNearEntries'

import { selectBookIds, selectFilter, selectPage, selectPerPage, selectSortBy } from 'widgets/booksListLinear/selectors'
import { slice } from 'widgets/booksListLinear/slice'
export const {
  assignBooks,
  assignBooksTotal,
  assignFilter,
  assignSortBy,
  assignPage,
  assignPerPage,
} = slice.actions

export const fetchBooks = () => (dispatch, getState) => {
  const state = getState()
  const query = {
    ...selectFilter()(state),
    page: selectPage()(state),
    perPage: selectPerPage()(state),
    sortBy: selectSortBy()(state),
  }
  return apiClient.getBooks(query).then(({ books, total }) => {
    dispatch(addBooks(books))
    dispatch(assignBooks(books))
    dispatch(assignBooksTotal(total))
  })
}

export const shiftSelection = (shift) => (dispatch, getState) => {
  const state = getState()
  const currentBook = selectCurrentBook()(state)
  const allBookIds = selectBookIds()(state)
  const currentIndex = allBookIds.indexOf(currentBook.id)
  var targetIndex = currentIndex + shift
  if (targetIndex < 0) { targetIndex = allBookIds.length - 1 }
  if (targetIndex >= allBookIds.length) { targetIndex = 0 }

  dispatch(setCurrentBookId(allBookIds[targetIndex]))
}

export const setupBooksListSelection = (bookId) => (dispatch, getState) => {
  const state = getState()
  const currentBook = bookId && selectBook(bookId)(state)
  if (currentBook) {
    dispatch(showBook(bookId))
  } else {
    dispatch(switchToFirstBook())
  }
}

const switchToFirstBook = () => (dispatch, getState) => {
  const id = selectBookIds()(getState())[0]
  dispatch(setCurrentBookId(id))
}

export const switchToPage = (page) => (dispatch) => {
  dispatch(assignPage(page))
  dispatch(fetchBooks()).then(() =>
    dispatch(switchToFirstBook())
  )
}

export const switchToSortType = (value) => (dispatch) => {
  dispatch(assignPage(1))
  dispatch(assignSortBy(value))
  dispatch(fetchBooks()).then(() =>
    dispatch(switchToFirstBook())
  )
}
