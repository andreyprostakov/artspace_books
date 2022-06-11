import { first, last } from 'lodash'
import apiClient from 'serverApi/apiClient'
import { setCurrentBookId } from 'store/axis/actions'
import { clearSelection } from 'store/selectables/actions'
import { selectBook, selectCurrentBook } from 'store/metadata/selectors'
import { addBooks, showBook } from 'store/metadata/actions'
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
  clearState: clearListInnerState,
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
    if (books.length > 0) dispatch(addBooks(books))
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

export const setupBooksListSelection = () => (dispatch, getState) => {
  const currentBook = selectCurrentBook()(getState())
  if (currentBook) {
    dispatch(showBook(currentBook.id))
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

export const clearListState = () => (dispatch) => {
  dispatch(clearListInnerState())
  dispatch(clearSelection())
}
