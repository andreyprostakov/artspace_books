import { first, last } from 'lodash'
import apiClient from 'store/books/apiClient'
import { selectCurrentBookId } from 'store/axis/selectors'
import { setRequestedBookId } from 'widgets/booksListYearly/actions'
import { clearSelection } from 'store/selectables/actions'
import {
  addBooks,
  fetchMissingBookIndexEntries,
  showBook
} from 'store/books/actions'
import { pickNearEntries } from 'utils/pickNearEntries'
import { selectBookIds, selectFilter, selectPage, selectPerPage, selectSortBy } from 'widgets/booksListLinear/selectors'
import { slice } from 'widgets/booksListLinear/slice'
import { toggleId } from 'store/selectables/actions'
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
  console.log(['fetchBooks', query])
  return apiClient.getBooksRefs(query).then(({ books, total }) => {
    if (books.length > 0) {
      const ids = books.map(book => book.id)
      dispatch(fetchMissingBookIndexEntries(ids))
    }
    dispatch(assignBooks(books))
    dispatch(assignBooksTotal(total))
  })
}

export const shiftSelection = (shift) => (dispatch, getState) => {
  const state = getState()
  const currentBookRef = selectCurrentBookRef()(state)
  const allBookIds = selectBookIds()(state)
  const currentIndex = allBookIds.indexOf(currentBookRef.id)
  var targetIndex = currentIndex + shift
  if (targetIndex < 0) { targetIndex = allBookIds.length - 1 }
  if (targetIndex >= allBookIds.length) { targetIndex = 0 }

  dispatch(setRequestedBookId(allBookIds[targetIndex]))
}

export const setupBooksListSelection = () => (dispatch, getState) => {
  const currentBookRef = selectCurrentBookRef()(getState())
  if (currentBookRef) {
    dispatch(showBook(currentBookRef.id))
  } else {
    dispatch(switchToFirstBook())
  }
}

export const switchToFirstBook = () => (dispatch, getState) => {
  const state = getState()
  const ids = selectBookIds()(state)
  const currentBookId = selectCurrentBookId()(state)
  if (ids.includes(currentBookId)) return

  dispatch(setRequestedBookId(ids[0]))
}

export const clearListState = () => (dispatch) => {
  dispatch(clearListInnerState())
  dispatch(clearSelection())
}

export const toggleCurrentBookSelected = () => (dispatch, getState) => {
  const id = selectCurrentBookId()(getState())
  dispatch(toggleId(id))
}
