import { first, last, max, min } from 'lodash'

import { slice } from 'store/slice'
import apiClient from 'serverApi/apiClient'

import {
  selectYearsToDisplay,
  selectBookIdsByYear,
  selectCurrentBook,
  selectTargetYear,
  selectYearsToLoad,
  selectShuffledBooksOfYear,
  selectYearsReversed
} from 'store/selectors'
export const {
  setCurrentAuthorId,
  setCurrentAuthorDetails,
  setCurrentBookId,
  setCurrentBookDetails,
  setDefaultBookImageUrl,
  setSeed,
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
  const { all } = state.booksList.years
  const currentYear = selectCurrentBook()(state)?.year
  const index = all.indexOf(currentYear)
  const targetIndex = max([0, min([all.length - 1, index + shift])])
  return all[targetIndex]
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
  const { currentId } = getState().booksList.books
  if (!currentId) { return }

  const details = await apiClient.getBookDetails(currentId)
  dispatch(slice.actions.setCurrentBookDetails(details))
}

const setCurrentBookToYear = (targetYear) => (dispatch, getState) => {
  const state = getState()
  const currentBook = selectCurrentBook()(state)
  if (currentBook?.year == targetYear) { return }

  const newCurrentBookId = first(selectBookIdsByYear(targetYear)(state))
  if (newCurrentBookId) {
    dispatch(setCurrentBookId(newCurrentBookId))
  }
}

export const shiftBookSelection = (shift) => (dispatch, getState) => {
  const state = getState()
  const currentBook = selectCurrentBook()(state)
  const yearBookIds = selectShuffledBooksOfYear(currentBook.year)(state).map(book => book.id)
  const index = yearBookIds.indexOf(currentBook.id)
  const targetId = yearBookIds[index + shift]
  if (!targetId) { return }

  dispatch(setCurrentBookId(targetId))
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

const pickCurrentBookFromLatestYear = () => (dispatch, getState) => {
  const state = getState()
  const years = selectYearsReversed()(state)
  const currentYear = first(years)
  dispatch(fetchBooksForYears([currentYear])).then(() =>
    dispatch(setCurrentBookToYear(currentYear))
  )
}

export const setupStoreForBooksPage = (currentBookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(slice.actions.cleanYearsList()),
    dispatch(slice.actions.cleanBooksList()),
    dispatch(setCurrentAuthorId(null)),
    dispatch(fetchAllTags()),
    dispatch(fetchYears()),
    dispatch(fetchAuthors())
  ]).then(() => {
    if (currentBookId) {
      dispatch(reloadBook(currentBookId))
      dispatch(setCurrentBookId(currentBookId))
    } else {
      dispatch(pickCurrentBookFromLatestYear())
    }
  })
}

export const setupStoreForAuthorPage = (authorId, currentBookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(slice.actions.cleanYearsList()),
    dispatch(slice.actions.cleanBooksList()),
    dispatch(fetchAllTags()),
    dispatch(loadAuthor(authorId)),
    dispatch(loadAuthorDetails(authorId)),
    dispatch(fetchAuthorYears(authorId)),
    dispatch(setCurrentAuthorId(authorId)),
    dispatch(fetchAuthorBooks(authorId)),
  ]).then(() => {
    const authorBookIds = Object.values(getState().booksList.books.byIds).filter(book => book.authorId == authorId).map(book => book.id)
    if (currentBookId && authorBookIds.includes(currentBookId)) {
      dispatch(reloadBook(currentBookId))
      dispatch(setCurrentBookId(currentBookId))
    } else {
      dispatch(pickCurrentBookFromLatestYear())
    }
  })
}

export const setupStoreForTagsPage = () => async (dispatch, getState) => {
    dispatch(fetchAllTags())
}

export const setupStoreForTagPage = (tagId, currentBookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(slice.actions.cleanYearsList()),
    dispatch(slice.actions.cleanBooksList()),
    dispatch(fetchAllTags()),
    dispatch(fetchYears({ tagId })),
    dispatch(fetchAuthors()),
    dispatch(fetchTagBooks(tagId)),
  ]).then(() => {
    if (currentBookId) {
      dispatch(reloadBook(currentBookId))
      dispatch(setCurrentBookId(currentBookId))
    } else {
      dispatch(pickCurrentBookFromLatestYear())
    }
  })
}

export const setupStoreForAuthorsPage = () => async (dispatch, getState) => {
    dispatch(fetchAllTags())
}

// PRIVATE

const lazyBookLoadIteration = (dispatch, getState, resolve, index = 0) => {
  if (index > 100) {
    resolve([])
    return
  }
  return setTimeout(() => {
    const { yearsToLoad, yearsInLoading } = getState().booksList.books
    const { currentId: currentAuthorId } = getState().booksList.authors
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
