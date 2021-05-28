import { compact, difference, groupBy, find, first, last, mapValues, max, min, remove, sort, uniq } from 'lodash'
import { createSelector, createSlice, configureStore, current } from '@reduxjs/toolkit'
import apiClient from 'serverApi/apiClient'

const slice = createSlice({
  name: 'booksList',
  initialState: {
    books: {
      byIds: {},
      currentId: null,
      currentDetails: {},
      modalShown: false,
      yearsLoaded: [],
      yearsToLoad: [],
      yearsInLoading: [],
      defaultImageUrl: null
    },
    years: {
      all: [],
      current: null
    },
    authors: {
      byIds: {},
      currentId: null,
      currentDetails: {},
      modalShown: false
    }
  },
  reducers: {
    setYears: (state, action) => {
      const years = action.payload
      state.years.all = years
      if (!years.includes(state.years.current)) {
        state.years.current = last(years)
      }
    },

    addYearsToLoad: (state, action) => {
      const years = action.payload
      state.books.yearsToLoad = years
    },

    markYearsAsLoading: (state, action) => {
      const years = state.books.yearsToLoad
      state.books.yearsToLoad = []
      state.books.yearsInLoading = uniq([...state.books.yearsInLoading, ...years])
    },

    markYearsAsLoaded: (state, action) => {
      const years = action.payload
      state.books.yearsLoaded = uniq([...state.books.yearsLoaded, ...years])
      state.books.yearsInLoading = difference(state.books.yearsInLoading, years)
    },

    setCurrentYear: (state, action) => {
      const targetYear = action.payload
      state.years.current = targetYear
    },

    setAuthors: (state, action) => {
      const authors = action.payload
      state.authors.byIds = {}
      state.authors.currentId = null
      authors.forEach(author => state.authors.byIds[author.id] = author)
    },

    setCurrentAuthorId: (state, action) => {
      const id = action.payload
      state.authors.currentId = id
    },

    setCurrentAuthorDetails: (state, action) => {
      const details = action.payload
      state.authors.currentDetails = details
    },

    setAuthorModalShown: (state, action) => {
      state.authors.modalShown = action.payload
    },

    showNewAuthorModal: (state, action) => {
      state.authors.currentId = null
      state.authors.currentDetails = {}
      state.authors.modalShown = true
    },

    switchToNewAuthor: (state, action) => {
      const details = action.payload
      state.authors.currentId = details.id
      state.authors.byIds[details.id] = { id: details.id, fullname: details.fullname }
      state.years.all = []
      state.years.current = null
      state.books.byIds = {}
      state.books.currentId = null
    },


    setBooks: (state, action) => {
      const books = action.payload
      state.books.byIds = {}
      books.forEach(book => state.books.byIds[book.id] = book)

      const years = uniq(books.map(book => book.year))
      state.books.yearsToLoad = []
      state.books.yearsInLoading = []
      state.books.yearsLoaded = years
    },

    addBook: (state, action) => {
      const book = action.payload
      const { year: bookYear } = book
      const { all: allYears, current: previouslyCurrentYear } = state.years

      state.books.byIds[book.id] = book
      state.books.currentId = book.id
      if (!allYears.includes(bookYear)) {
        state.years.all = [...allYears, bookYear].sort()
        state.books.yearsLoaded = [...state.books.yearsLoaded, bookYear]
      }
      if (previouslyCurrentYear !== bookYear) {
        state.years.current = bookYear

        const yearBook = Object.values(state.books.byIds).find(book => book.year == previouslyCurrentYear)
        if (!yearBook) {
          state.years.all = state.years.all.filter(year => year != previouslyCurrentYear)
        }
      }
    },

    addBooks: (state, action) => {
      const books = action.payload
      books.forEach(book => state.books.byIds[book.id] = book)
    },

    setDefaultBookImageUrl: (state, action) => {
      const url = action.payload
      state.books.defaultImageUrl = url
    },

    updateCurrentBookId: (state) => {
      const { current: currentYear } = state.years
      const { currentId: currentBookId, byIds: allBooks } = state.books
      const currentBook = currentBookId && allBooks[currentBookId]
      if (!currentBook || currentBook.year !== currentYear) {
        state.books.currentId = Object.values(allBooks).find(book => book.year == currentYear)?.id
      }
    },

    resetSelection: (state) => {
      const year = last(state.years.all)
      state.years.current = year
      state.books.currentId = Object.values(state.books.byIds).find(book => book.year == year)?.id
    },

    shiftBookSelection: (state, action) => {
      const shift = action.payload
      const yearBookIds = Object.values(state.books.byIds).filter(book => book.year == state.years.current).map(book => book.id)
      const index = yearBookIds.indexOf(state.books.currentId)
      const targetId = yearBookIds[index + shift]
      if (!targetId) { return }

      state.books.currentId = targetId
    },

    setBookModalShown: (state, action) => {
      if (!state.books.currentId) { return }

      state.books.modalShown = action.payload
    },

    setCurrentBookDetails: (state, action) => {
      const details = action.payload
      state.books.currentDetails = details
    }
  }
})

export const {
  resetSelection,
  shiftBookSelection,
  setBookModalShown,
  setCurrentAuthorId,
  setAuthorModalShown,
  setDefaultBookImageUrl,
  showNewAuthorModal
} = slice.actions


export const selectYearsReversed = state => state.booksList.years.all.slice().reverse()

export const selectCurrentYear = state => state.booksList.years.current

export const selectYearsToDisplay = (year = null) => state => {
  const topYear = year || state.booksList.years.current
  const { all } = state.booksList.years
  const allReversed = all.slice().reverse()
  const index = allReversed.indexOf(topYear)
  return compact(
    [
      topYear,
      allReversed[index + 1],
      allReversed[index + 2]
    ]
  )
}

const selectYearsToLoad = year => state => {
  const { all } = state.booksList.years
  const { yearsToLoad, yearsInLoading, yearsLoaded } = state.booksList.books
  const allReversed = all.slice().reverse()
  const index = allReversed.indexOf(year)
  const nearYears = compact(
    [
      allReversed[index - 2],
      allReversed[index - 1],
      year,
      allReversed[index + 1],
      allReversed[index + 2]
    ]
  )
  return [...yearsToLoad, ...difference(nearYears, [...yearsInLoading, ...yearsLoaded])]
}

export const selectAuthor = id => state => state.booksList.authors.byIds[id]

export const selectCurrentAuthorId = state => state.booksList.authors.currentId

export const selectCurrentAuthorDetails = state => state.booksList.authors.currentDetails

export const selectCurrentAuthor = state => {
  const { byIds: all, currentId } = state.booksList.authors
  return all[currentId]
}

export const selectAuthorModalShown = state => state.booksList.authors.modalShown

export const selectBook = id => state => state.booksList.books.byIds[id]

export const selectBooks = state => Object.values(state.booksList.books.byIds)

export const selectCurrentBook = state => {
  const { byIds: all, currentId } = state.booksList.books
  return all[currentId]
}

export const selectSelectedBookId = state => state.booksList.books.currentId

export const selectCurrentBookDetails = state => state.booksList.books.currentDetails

export const selectBookModalShown = state => state.booksList.books.modalShown

export const selectBookIdsByYear = year => state => {
  return Object.values(state.booksList.books.byIds).filter(book => book.year == year).map(book => book.id)
}

export const selectBookDefaultImageUrl = state => state.booksList.books.defaultImageUrl


function fetchYears(params = {}) {
  return async (dispatch, getState) => {
    const years = await apiClient.getYears(params)
    dispatch(slice.actions.setYears(years))
  }
}

export async function fetchAuthors(dispatch, getState) {
  const response = await apiClient.getAuthors()
  dispatch(slice.actions.setAuthors(response))
}

function fetchBooks(params = {}) {
  return async (dispatch, getState) => {
    const yearsToDisplay = selectYearsToDisplay()(getState())
    const response = await apiClient.getBooks({ years: yearsToDisplay, ...params })
    dispatch(slice.actions.setBooks(response))
  }
}

export function reloadBook(id) {
  return async (dispatch, getState) => {
    const response = await apiClient.getBook(id)
    dispatch(slice.actions.addBook(response))
  }
}

function lazyBookLoadIteration(dispatch, getState, resolve, index = 0) {
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
      apiClient.getBooks({ years: yearsToLoad, author_id: currentAuthorId }).then((books) => {
        dispatch(slice.actions.markYearsAsLoaded(yearsToLoad))
        resolve(books)
      })
    }
  }, 100 + Math.floor(Math.random() * 100))
}

function loadBooksLazily(dispatch, getState) {
  const { yearsToLoad } = getState().booksList.books
  if (yearsToLoad.length < 1) {
    return []
  } else {
    return new Promise((resolve) => lazyBookLoadIteration(dispatch, getState, resolve))
  }
}

function changeSelectedYear(selectTargetYear) {
  return async (dispatch, getState) => {
    const state = getState()
    const targetYear = selectTargetYear(state)
    if (!targetYear) { return }

    if (state.booksList.years.current != targetYear) {
      dispatch(slice.actions.setCurrentYear(targetYear))
      dispatch(slice.actions.updateCurrentBookId())
    }

    const yearsToLoad = selectYearsToLoad(targetYear)(state)
    if (yearsToLoad.length < 1) { return }

    dispatch(slice.actions.addYearsToLoad(yearsToLoad))

    const books = await loadBooksLazily(dispatch, getState)
    dispatch(slice.actions.addBooks(books))
    dispatch(slice.actions.updateCurrentBookId())
  }
}

export function shiftYear(shift) {
  return changeSelectedYear(state => {
    const { all, current } = state.booksList.years
    const index = all.indexOf(current)
    const targetIndex = max([0, min([all.length - 1, index + shift])])
    return all[targetIndex]
  })
}

export function gotoFirstYear() {
  return changeSelectedYear(state => first(state.booksList.years.all))
}

export function gotoLastYear() {
  return changeSelectedYear(state => last(state.booksList.years.all))
}

export function initializeList(dispatch) {
  return showFullList(dispatch).then(() =>
    dispatch(resetSelection())
  )
}

export function showFullList(dispatch) {
  return Promise.all([
    dispatch(fetchYears()),
    dispatch(fetchAuthors)
  ]).then(() =>
    dispatch(fetchBooks())
  )
}

export const setCurrentAuthor = authorId => (dispatch, getState) => {
  dispatch(slice.actions.setCurrentAuthorId(authorId))
  Promise.all([
    dispatch(fetchYears({ author_id: authorId }))
  ]).then(() => {
    const years = getState().booksList.years.all
    dispatch(fetchBooks({ years: years, author_id: authorId }))
  })
}

export async function loadCurrentAuthorDetails(dispatch, getState) {
  const { currentId } = getState().booksList.authors
  console.log(currentId)
  if (!currentId) { return }

  const details = await apiClient.getAuthorDetails(currentId)
  dispatch(slice.actions.setCurrentAuthorDetails(details))
}

export function loadNewAuthor(id) {
  return async (dispatch, getState) => {
    const details = await apiClient.getAuthorDetails(id)
    dispatch(slice.actions.switchToNewAuthor(details))
  }
}

export async function loadCurrentBookDetails(dispatch, getState) {
  const { currentId } = getState().booksList.books
  if (!currentId) { return }

  const details = await apiClient.getBookDetails(currentId)
  dispatch(slice.actions.setCurrentBookDetails(details))
}

export default slice.reducer
