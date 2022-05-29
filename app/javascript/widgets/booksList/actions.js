import { clamp, first, last, max, min, pull } from 'lodash'
import { slice } from 'widgets/booksList/slice'
import { pickNearEntries } from 'utils/pickNearEntries'
import apiClient from 'serverApi/apiClient'

import {
  selectCurrentAuthorId,
  selectCurrentBookId,
} from 'store/axis/selectors'
import {
  setCurrentBookId as setCurrentBookIdOriginal,
} from 'store/axis/actions'

import {
  selectTagNames,
} from 'store/metadata/selectors'

import {
  selectBook,
  selectBooks,
  selectBookIdsByYear,
  selectBookIdsInProcessing,
  selectCurrentBook,
  selectShuffledBooksOfYear,
  selectTargetYear,
  selectYears,
  selectYearCurrentBookId,
  selectYearsToLoad,
} from 'widgets/booksList/selectors'

import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'

export const {
  addBook,
  addBookIdToSelected,
  addBooks,
  addYears,
  addYearsToLoad,
  clearBooksIndexed,
  cleanBooksList,
  clearBooksSelection,
  markBookAsInProcess,
  unmarkBookAsInProcess,
  markYearsAsLoaded,
  markYearsAsLoading,
  removeBookIdFromSelected,
  setBookShiftDirectionHorizontal,
  setCurrentBookDetails,
  setCurrentBookForYear,
  setDefaultBookImageUrl,
  setNextBookId,
  setSeed,
  setYears,
} = slice.actions

export const setupBooksListSelection = (bookId) => (dispatch, getState) => {
  const currentBook = bookId && selectBook(bookId)(getState())
  if (currentBook) {
    dispatch(showBook(bookId))
  } else {
    dispatch(jumpToLatestYear())
  }
}

export const setCurrentBookId = (bookId) => (dispatch, getState) => {
  dispatch(setCurrentBookIdOriginal(bookId))
  dispatch(setNextBookId(null))
}

export const showBook = (bookId) => (dispatch, getState) => {
  if (!bookId) { throw('Trying to show nothing!') }
  const state = getState()
  const currentBookId = selectCurrentBookId()(state)
  const book = selectBook(bookId)(state)
  if (!book) { throw(`Book #${bookId} is missing! Cannot show it.`) }

  if (bookId != currentBookId) {
    dispatch(setNextBookId(bookId))
  }
  const currentYearsBookId = selectYearCurrentBookId(book.year)(state)
  if (bookId != currentYearsBookId) {
    dispatch(setCurrentBookForYear({ id: bookId, year: book.year }))
  }
}

export const upsertBook = (book) => (dispatch, getState) => {
  const state = getState()
  const years = selectYears()(state)
  const previousYear = selectCurrentBook()(state)?.year

  dispatch(addBook(book))
  if (!years.includes(book.year)) { dispatch(addYears([book.year])) }

  if (previousYear && previousYear !== book.year) {
    const yearBook = selectBooks()(state).find(book => book.year == previousYear)
    if (!yearBook) {
      setYears(years.filter(year => year != previousYear))
    }
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

  dispatch(setNextBookId(targetId))
}

export const syncBookStats = (id) => async (dispatch, getState) => {
  const ids = selectBookIdsInProcessing()(getState())
  if (ids.includes(id)) { return }

  Promise.all([
    dispatch(markBookAsInProcess(id)),
    dispatch(reloadBookWithSync(id))
  ]).then(() =>
    dispatch(unmarkBookAsInProcess(id))
  )
}

export const syncCurrentBookStats = () => async (dispatch, getState) => {
  const id = selectCurrentBookId()(getState())
  if (!id) { return }

  dispatch(syncBookStats(id))
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
  const books = await apiClient.getBooks({ authorId })
  dispatch(addBooks(books))
}

export const fetchTagBooks = (tagId) => async (dispatch, getState) => {
  const books = await apiClient.getBooks({ tagId })
  dispatch(addBooks(books))
}

export const fetchBooksForYears = (years) => async (dispatch, getState) => {
  if (!years.length) { return }

  dispatch(addYearsToLoad(years))
  const loadedBooks = await loadBooksLazily(dispatch, getState)
  dispatch(addBooks(loadedBooks))
}

export const reloadBook = (id) => async (dispatch, getState) => {
  const book = await apiClient.getBook(id)
  dispatch(upsertBook(book))
  dispatch(showBook(id))
}

const reloadBookWithSync = (id) => async (dispatch, getState) => {
  const apiCall = apiClient.syncBookStats(id)
    .fail(response => {
      dispatch(addErrorMessage(`Book #${id} not synced due to some failure`))
      return response
    })
    .then(response => {
      const book = response
      dispatch(addSuccessMessage(`Book #${id} synced`))
      dispatch(upsertBook(book))
      return book
    })
  const result = await Promise.race(
    [
      apiCall,
      new Promise((resolve) => setTimeout(() => resolve(null), 10000))
    ]
  )
  if (result === null) {
    dispatch(addErrorMessage(`Book #${id} not synced due to timeout failure`))
  }
}

export const reloadBooks = () => (dispatch, getState) => {
  const currentBookId = selectCurrentBookId()(getState())
  dispatch(clearBooksIndexed())
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
      apiClient.getBooks({ years: yearsToLoad, authorId: currentAuthorId }).then((books) => {
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
