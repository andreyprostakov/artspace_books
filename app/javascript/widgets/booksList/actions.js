import { clamp, first, last, max, min, pull } from 'lodash'
import { slice } from 'widgets/booksList/slice'
import { pickNearEntries } from 'utils/pickNearEntries'
import apiClient from 'serverApi/apiClient'

import {
  selectCurrentAuthorId,
  selectCurrentBookId,
} from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'

import {
  selectBook,
  selectBooks,
  selectCurrentBook,
  selectTagNames,
} from 'store/metadata/selectors'
import {
  addBook,
  addBooks,
  clearBooks,
  setCurrentBookDetails,
  showBook,
} from 'store/metadata/actions'

import {
  selectBookIdsByYear,
  selectShuffledBooksOfYear,
  selectTargetYear,
  selectYears,
  selectYearCurrentBookId,
  selectYearsToLoad,
} from 'widgets/booksList/selectors'

import {
  clearSelection,
  selectId,
  unselectId,
} from 'store/selectables/actions'

export const {
  addYears,
  addYearsToLoad,
  clearState: clearListInnerState,
  markBookAsInProcess,
  markBooksYearsAsLoaded,
  unmarkBookAsInProcess,
  markYearsAsLoaded,
  markYearsAsLoading,
  setBookShiftDirectionHorizontal,
  setCurrentBookForYear,
  setYears,
} = slice.actions

export const setupBooksListSelection = () => (dispatch, getState) => {
  const bookId = selectCurrentBookId()(getState())
  if (bookId) {
    dispatch(reloadBook(bookId))
  } else {
    dispatch(jumpToLatestYear())
  }
}

export const setBookAsCurrentInYear = (bookId) => (dispatch, getState) => {
  const state = getState()
  const book = selectBook(bookId)(state)
  const currentYearsBookId = selectYearCurrentBookId(book.year)(state)
  if (bookId != currentYearsBookId) {
    dispatch(setCurrentBookForYear({ id: bookId, year: book.year }))
  }
}

export const shiftYear = (shift) => changeSelectedYear(state => {
  const years = selectYears()(state)
  const currentYear = selectCurrentBook()(state)?.year
  const index = years.indexOf(currentYear)
  if (index < 0) { return null }

  const targetIndex = clamp(index + shift, 0, years.length - 1)
  return years[targetIndex]
})

export const jumpToFirstYear = () => changeSelectedYear(state => first(selectYears()(state)))

export const jumpToLastYear = () => changeSelectedYear(state => last(selectYears()(state)))

export const shiftSelection = (shift) => (dispatch, getState) => {
  const state = getState()
  const currentBook = selectCurrentBook()(state)
  const yearBookIds = selectShuffledBooksOfYear(currentBook.year)(state).map(book => book.id)
  const displayedBookIds = pickNearEntries(yearBookIds, currentBook.id, { lengthBefore: 1, lengthAfter: 1 })
  const targetId = shift > 0 ? last(displayedBookIds) : first(displayedBookIds)
  if (!targetId) { return }

  dispatch(setCurrentBookId(targetId))
}

export const jumpToLatestYear = () => (dispatch, getState) => {
  const targetYear = last(selectYears()(getState()))
  dispatch(jumpToYear(targetYear))
}

export const loadCurrentBookDetails = () => async (dispatch, getState) => {
  const currentId = selectCurrentBookId()(getState())
  if (!currentId) { return }

  const details = await apiClient.getBookDetails(currentId)
  dispatch(setCurrentBookDetails(details))
}

export const fetchYears = (query = {}) => async (dispatch, getState) => {
  const years = await apiClient.getYears(query)
  dispatch(addYears(years))
}

export const fetchAuthorYears = (authorId) => async (dispatch, getState) => {
  const years = await apiClient.getAuthorYears(authorId)
  dispatch(addYears(years))
}

export const fetchAuthorBooks = (authorId) => async (dispatch, getState) => {
  const books = await apiClient.getBooks({ authorId }).books
  dispatch(addBooks(books))
  dispatch(markBooksYearsAsLoaded(books))
}

export const fetchTagBooks = (tagId) => async (dispatch, getState) => {
  const books = await apiClient.getBooks({ tagId }).books
  dispatch(addBooks(books))
  dispatch(markBooksYearsAsLoaded(books))
}

export const fetchBooksForYears = (years) => async (dispatch, getState) => {
  if (!years.length) { return }

  dispatch(addYearsToLoad(years))
  const loadedBooks = await loadBooksLazily(dispatch, getState)
  dispatch(addBooks(loadedBooks))
  dispatch(markBooksYearsAsLoaded(loadedBooks))
}

export const reloadBook = (id) => async (dispatch, getState) => {
  const book = await apiClient.getBook(id)
  dispatch(addBook(book))
  dispatch(updateBookInYears(book))
  dispatch(showBook(id))
}

const updateBookInYears = (book) => (dispatch, getState) => {
  const state = getState()
  const years = selectYears()(state)
  const previousYear = selectCurrentBook()(state)?.year

  if (!years.includes(book.year)) { dispatch(addYears([book.year])) }

  if (previousYear && previousYear !== book.year) {
    const yearBook = selectBooks()(state).find(book => book.year == previousYear)
    if (!yearBook) {
      setYears(years.filter(year => year != previousYear))
    }
  }
}

export const reloadBooks = () => (dispatch, getState) => {
  const currentBookId = selectCurrentBookId()(getState())
  dispatch(clearListState())
  currentBookId && dispatch(reloadBook(currentBookId))
}

export const addTagToBook = (id, tagName) => async (dispatch, getState) => {
  const state = getState()
  const book = selectBook(id)(state)
  var tagNames = selectTagNames(book.tagIds)(state)
  tagNames.push(tagName)
  apiClient.putBookDetails(id, { tagNames }).then(() =>
    dispatch(reloadBook(id))
  )
}

export const removeTagFromBook = (id, tagName) => async (dispatch, getState) => {
  const state = getState()
  const book = selectBook(id)(state)
  var tagNames = selectTagNames(book.tagIds)(state)
  pull(tagNames, tagName)
  tagNames.push('')
  apiClient.putBookDetails(id, { tagNames }).then(() =>
    dispatch(reloadBook(id))
  )
}

export const jumpToYear = (year) => (dispatch, getState) => {
  if (!year) { return }

  dispatch(switchToBookByYear(year))
  const yearsToLoad = selectYearsToLoad(year)(getState())
  if (yearsToLoad.length < 1) { return }

  dispatch(fetchBooksForYears(yearsToLoad)).then(() =>
    dispatch(switchToBookByYear(year))
  )
}

// PRIVATES

const loadBooksLazily = (dispatch, getState) =>{
  const { yearsToLoad } = getState().booksList
  if (yearsToLoad.length < 1) {
    return []
  } else {
    return new Promise((resolve) => lazyBookLoadIteration(dispatch, getState, resolve))
  }
}

const lazyBookLoadIteration = (dispatch, getState, resolve, index = 0) => {
  if (index > 100) {
    resolve([])
    return
  }
  return setTimeout(() => {
    const { yearsToLoad, yearsInLoading } = getState().booksList
    const currentAuthorId = selectCurrentAuthorId()(getState())
    if (yearsToLoad.length < 1) {
      resolve([])
    } else if (yearsInLoading.length > 0) {
      lazyBookLoadIteration(dispatch, getState, resolve, index + 1)
    } else {
      dispatch(markYearsAsLoading())
      apiClient.getBooks({ years: yearsToLoad, authorId: currentAuthorId }).then(({ books }) => {
        dispatch(markYearsAsLoaded(yearsToLoad))
        resolve(books)
      })
    }
  }, 100 + Math.floor(Math.random() * 100))
}

const changeSelectedYear = (selectTargetYear) => async (dispatch, getState) => {
  const targetYear = selectTargetYear(getState())
  dispatch(jumpToYear(targetYear))
}

const switchToBookByYear = (targetYear) => (dispatch, getState) => {
  const state = getState()
  const bookIdPreselected = selectYearCurrentBookId(targetYear)(state)
  if (bookIdPreselected) {
    dispatch(showBook(bookIdPreselected))
  } else {
    const bookId = first(selectBookIdsByYear(targetYear)(state))
    if (bookId) {
      dispatch(showBook(bookId))
    }
  }
}

export const addBookIdToSelected = selectId
export const removeBookIdFromSelected = unselectId
export const clearBooksSelection = clearSelection

export const clearListState = () => (dispatch) => {
  dispatch(clearBooks())
  dispatch(clearListInnerState())
  dispatch(clearSelection())
}
