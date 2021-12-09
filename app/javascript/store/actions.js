import { first, last, max, min } from 'lodash'

import { slice } from 'store/slice'
import apiClient from 'serverApi/apiClient'
import {
  setCurrentAuthorId,
} from 'store/axis/actions'
import {
  setNextBookId,
} from 'widgets/booksList/actions'
import {
  selectCurrentAuthorId,
  selectCurrentBookId,
} from 'store/axis/selectors'

import {
  selectYearsToDisplay,
  selectBookIdsByYear,
  selectCurrentBook,
  selectYearCurrentBookId,
  selectTargetYear,
  selectYearsToLoad,
  selectShuffledBooksOfYear,
  selectSyncedBookId,
  selectYearsReversed
} from 'store/selectors'
import { pickNearEntries } from 'utils/pickNearEntries'

export const {
  cleanBooksList,
  cleanYearsList,
  setCurrentAuthorDetails,
  setCurrentBookDetails,
  setCurrentBookForYear,
  setDefaultBookImageUrl,
  setSeed,
  setSyncedBookId,
  updateAuthor,
} = slice.actions

export const fetchAuthors = () => async (dispatch, getState) => {
  const response = await apiClient.getAuthors()
  dispatch(slice.actions.setAuthors(response))
}

export const fetchAllTags = () => async (dispatch) => {
  const response = await apiClient.getTags()
  dispatch(slice.actions.setTags(response))
}

export const reloadBook = (id) => async (dispatch, getState) => {
  const response = await apiClient.getBook(id)
  dispatch(slice.actions.addBook(response))
}

export const shiftYear = (shift) => changeSelectedYear(state => {
  const { all: allYears } = state.booksList.years
  const currentYear = selectCurrentBook()(state)?.year
  const index = allYears.indexOf(currentYear)
  const targetIndex = max([0, min([allYears.length - 1, index + shift])])
  return allYears[targetIndex]
})

export const gotoFirstYear = () => changeSelectedYear(state => first(state.booksList.years.all))

export const gotoLastYear = () => changeSelectedYear(state => last(state.booksList.years.all))

export const loadAuthorDetails = (authorId) => async (dispatch, getState) => {
  const details = await apiClient.getAuthorDetails(authorId)
  dispatch(slice.actions.setCurrentAuthorDetails(details))
}

export const loadAuthor = (id) => async (dispatch, getState) => {
  const author = await apiClient.getAuthor(id)
  dispatch(slice.actions.addAuthor(author))
}

export const loadCurrentBookDetails = () => async (dispatch, getState) => {
  const currentId = selectCurrentBookId()(getState())
  if (!currentId) { return }

  const details = await apiClient.getBookDetails(currentId)
  dispatch(slice.actions.setCurrentBookDetails(details))
}

const setCurrentBookToYear = (targetYear) => (dispatch, getState) => {
  const state = getState()
  const currentBook = selectCurrentBook()(state)
  if (currentBook?.year == targetYear) { return }

  const bookIds = selectBookIdsByYear(targetYear)(state)
  const yearPreselectedBookId = selectYearCurrentBookId(targetYear)(state)
  var newCurrentBookId = null
  if (!yearPreselectedBookId || !bookIds.includes(yearPreselectedBookId)) {
    newCurrentBookId = first(bookIds)
  } else {
    newCurrentBookId = yearPreselectedBookId
  }

  if (newCurrentBookId) {
    dispatch(setNextBookId(newCurrentBookId))
  }
}

export const shiftBookSelection = (shift) => (dispatch, getState) => {
  const state = getState()
  const currentBook = selectCurrentBook()(state)
  const yearBookIds = selectShuffledBooksOfYear(currentBook.year)(state).map(book => book.id)
  const displayedBookIds = pickNearEntries(yearBookIds, currentBook.id, { lengthBefore: 1, lengthAfter: 1 })
  const targetId = shift > 0 ? last(displayedBookIds) : first(displayedBookIds)
  if (!targetId) { return }

  dispatch(setNextBookId(targetId))
}

export const syncBookStats = (id) => async (dispatch, getState) => {
  const syncedBookId = selectSyncedBookId()(getState())
  if (syncedBookId) { return }

  dispatch(setSyncedBookId(id))
  const response = await apiClient.syncBookStats(id)
  dispatch(slice.actions.addBook(response))
  dispatch(setSyncedBookId(null))
}

export const syncCurrentBookStats = () => async (dispatch, getState) => {
  const currentBook = selectCurrentBook()(getState())
  if (!currentBook) { return }

  dispatch(syncBookStats(currentBook.id))
}

export const fetchYears = (query = {}) => async (dispatch, getState) => {
  const years = await apiClient.getYears(query)
  dispatch(slice.actions.addYears(years))
}

export const fetchAuthorYears = (authorId) => async (dispatch, getState) => {
  const years = await apiClient.getAuthorYears(authorId)
  dispatch(slice.actions.addYears(years))
}

export const fetchAuthorBooks = (authorId) => async (dispatch, getState) => {
  const books = await apiClient.getBooks({ authorId })
  dispatch(slice.actions.addBooks(books))
}

export const fetchTagBooks = (tagId) => async (dispatch, getState) => {
  const books = await apiClient.getBooks({ tagId })
  dispatch(slice.actions.addBooks(books))
}

export const fetchBooksForYears = (years) => async (dispatch, getState) => {
  dispatch(slice.actions.addYearsToLoad(years))

  const loadedBooks = await loadBooksLazily(dispatch, getState)
  dispatch(slice.actions.addBooks(loadedBooks))
}

export const pickCurrentBookFromLatestYear = () => (dispatch, getState) => {
  const state = getState()
  const years = selectYearsReversed()(state)
  const currentYear = first(years)
  dispatch(fetchBooksForYears([currentYear])).then(() =>
    dispatch(setCurrentBookToYear(currentYear))
  )
}

export const setupStoreForAuthorCard = (authorId) => async (dispatch) => {
  dispatch(loadAuthorDetails(authorId))
}

// PRIVATE

const lazyBookLoadIteration = (dispatch, getState, resolve, index = 0) => {
  if (index > 100) {
    resolve([])
    return
  }
  return setTimeout(() => {
    const { yearsToLoad, yearsInLoading } = getState().booksList.books
    const currentAuthorId = selectCurrentAuthorId()(getState())
    if (yearsToLoad.length < 1) {
      resolve([])
    } else if (yearsInLoading.length > 0) {
      lazyBookLoadIteration(dispatch, getState, resolve, index + 1)
    } else {
      dispatch(slice.actions.markYearsAsLoading())
      apiClient.getBooks({ years: yearsToLoad, authorId: currentAuthorId }).then((books) => {
        dispatch(slice.actions.markYearsAsLoaded(yearsToLoad))
        resolve(books)
      })
    }
  }, 100 + Math.floor(Math.random() * 100))
}

const loadBooksLazily = (dispatch, getState) =>{
  const { yearsToLoad } = getState().booksList.books
  if (yearsToLoad.length < 1) {
    return []
  } else {
    return new Promise((resolve) => lazyBookLoadIteration(dispatch, getState, resolve))
  }
}

const changeSelectedYear = (selectTargetYear) => async (dispatch, getState) => {
  const state = getState()
  const targetYear = selectTargetYear(state)
  if (!targetYear) { return }

  dispatch(setCurrentBookToYear(targetYear))

  const yearsToLoad = selectYearsToLoad(targetYear)(state)
  if (yearsToLoad.length < 1) { return }

  dispatch(fetchBooksForYears(yearsToLoad)).then(() => {
    dispatch(setCurrentBookToYear(targetYear))
  })
}
