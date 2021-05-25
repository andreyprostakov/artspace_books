import { compact, difference, groupBy, find, first, last, mapValues, max, min, remove, sort, uniq } from 'lodash'
import { createSelector, createSlice, configureStore, current } from '@reduxjs/toolkit'
import apiClient from 'serverApi/apiClient'

const slice = createSlice({
  name: 'booksList',
  initialState: {
    books: {
      byIds: {},
      currentId: null,
      modalShown: false,
      yearsLoaded: [],
      yearsToLoad: [],
      yearsInLoading: []
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
      state.years.current = last(years)
    },

    addYearsToLoad: (state, action) => {
      const years = difference(action.payload, [...state.books.yearsInLoading, ...state.books.yearsLoaded])
      state.books.yearsToLoad = uniq([...state.books.yearsToLoad, ...years])
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
      state.books.currentId = Object.values(state.books.byIds).find(book => book.year == targetYear)?.id
    },

    setAuthors: (state, action) => {
      const authors = action.payload
      state.authors.byIds = {}
      state.authors.currentId = null
      state.authors.currentDetails = {}
      authors.forEach(author => state.authors.byIds[author.id] = author)
    },

    setCurrentAuthorId: (state, action) => {
      const id = action.payload
      state.authors.currentId = id
      state.authors.currentDetails = {}
    },

    setCurrentAuthorDetails: (state, action) => {
      const details = action.payload
      state.authors.currentDetails = details
    },

    setAuthorModalShown: (state, action) => {
      if (!state.authors.currentId) { return }

      state.authors.modalShown = action.payload
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

      const years = uniq(books.map(book => book.year))
    },

    setSelection: (state) => {
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
    }
  }
})


export const selectYearsReversed = state => state.booksList.years.all.slice().reverse()

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

export const selectBookModalShown = state => state.booksList.books.modalShown

export const selectBookIdsByYear = year => state => {
  return Object.values(state.booksList.books.byIds).filter(book => book.year == year).map(book => book.id)
}

export const {
  setSelection,
  shiftBookSelection,
  setBookModalShown,
  setCurrentAuthorId,
  setAuthorModalShown
} = slice.actions


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

function loadBooksLazily(dispatch, getState) {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const { yearsToLoad: years } = getState().booksList.books
        const { currentId: currentAuthorId } = getState().booksList.authors
        dispatch(slice.actions.markYearsAsLoading())
        if (years.length < 1) {
          resolve([])
          return
        }

        apiClient.getBooks({ years, author_id: currentAuthorId }).then((books) => {
          dispatch(slice.actions.markYearsAsLoaded(years))
          resolve(books)
        })
      },
      400
    )
  })
}

function changeSelectedYear(selectTargetYear) {
  return async (dispatch, getState) => {
    const state = getState()
    const targetYear = selectTargetYear(state)
    if (!targetYear) { return }

    if (state.booksList.years.current != targetYear) {
      dispatch(slice.actions.setCurrentYear(targetYear))
    }

    const yearsToDisplay = selectYearsToDisplay(targetYear)(state)
    dispatch(slice.actions.addYearsToLoad(yearsToDisplay))

    const books = await loadBooksLazily(dispatch, getState)
    dispatch(slice.actions.addBooks(books))
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
  Promise.all([
    dispatch(fetchYears()),
    dispatch(fetchAuthors)
  ]).then(() =>
    dispatch(fetchBooks())
  ).then(() =>
    dispatch(setSelection())
  )
}

export const setCurrentAuthor = authorId => (dispatch, getState) => {
  dispatch(slice.actions.setCurrentAuthorId(authorId))
  Promise.all([
    dispatch(fetchYears({ author_id: authorId }))
  ]).then(() => {
    const years = getState().booksList.years.all
    dispatch(fetchBooks({ years: years, author_id: authorId }))
  }).then(() =>
    dispatch(setSelection())
  )
}

export async function reloadCurrentAuthorDetails(dispatch, getState) {
  console.log('reloadCurrentAuthorDetails')
  console.log(getState)
  const { currentId } = getState().booksList.authors
  if (!currentId) { return }

  const details = await apiClient.getAuthorDetails(currentId)
  dispatch(slice.actions.setCurrentAuthorDetails(details))
}

export default slice.reducer
