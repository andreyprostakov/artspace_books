import { compact, difference, groupBy, find, first, last, mapValues, sort, uniq } from 'lodash'
import { createSelector, createSlice, configureStore, current } from '@reduxjs/toolkit'
import apiClient from 'serverApi/apiClient'

const slice = createSlice({
  name: 'booksList',
  initialState: {
    books: {
      byIds: {},
      currentId: null,
      yearsLoaded: []
    },
    years: {
      all: [],
      current: null
    },
    authors: {
      byIds: {}
    }
  },
  reducers: {
    setYears: (state, action) => {
      const years = action.payload
      state.years.all = years.sort()
    },

    setCurrentYear: (state, action) => {
      const targetYear = action.payload
      state.years.current = targetYear
      state.books.currentId = Object.values(state.books.byIds).find(book => book.year == targetYear)?.id
    },

    setAuthors: (state, action) => {
      const authors = action.payload
      state.authors.byIds = {}
      authors.forEach(author => state.authors.byIds[author.id] = author)
    },

    setBooks: (state, action) => {
      const books = action.payload
      state.books.byIds = {}
      books.forEach(book => state.books.byIds[book.id] = book)

      const years = uniq(books.map(book => book.year))
      state.books.yearsLoaded = years
    },

    addBooks: (state, action) => {
      const books = action.payload
      books.forEach(book => state.books.byIds[book.id] = book)

      const years = uniq(books.map(book => book.year))
      state.books.yearsLoaded = uniq([...state.books.yearsLoaded, ...years])
    },

    setSelection: (state) => {
      const year = last(state.years.all)
      state.years.current = year
      state.books.currentId = Object.values(state.books.byIds).find(book => book.year == year).id
    },

    shiftBookSelection: (state, action) => {
      const shift = action.payload
      const yearBookIds = Object.values(state.books.byIds).filter(book => book.year == state.years.current).map(book => book.id)
      const index = yearBookIds.indexOf(state.books.currentId)
      const targetId = yearBookIds[index + shift]
      if (!targetId) { return }

      state.books.currentId = targetId
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

export const selectBook = id => state => state.booksList.books.byIds[id]

export const selectSelectedBookId = state => state.booksList.books.currentId

export const selectBookIdsByYear = year => state => {
  return Object.values(state.booksList.books.byIds).filter(book => book.year == year).map(book => book.id)
}

export const { setSelection, shiftBookSelection } = slice.actions


export async function fetchYears(dispatch, getState) {
  const response = await $.ajax({ url: 'years.json' })
  dispatch(slice.actions.setYears(response))
}

export async function fetchAuthors(dispatch, getState) {
  const response = await $.ajax({ url: 'authors.json' })
  dispatch(slice.actions.setAuthors(response))
}

export async function fetchBooks(dispatch, getState) {
  const yearsToDisplay = selectYearsToDisplay()(getState())
  const response = await apiClient.getBooks({ years: yearsToDisplay })
  dispatch(slice.actions.setBooks(response))
}

export function shiftYear(shift) {
  return async (dispatch, getState) => {
    const state = getState()
    const { all, current } = state.booksList.years
    const index = all.indexOf(current)
    const targetYear = all[index + shift]
    console.log(targetYear)
    if (!targetYear) { return }

    const yearsToDisplay = selectYearsToDisplay(targetYear)(state)
    const yearsToLoad = difference(yearsToDisplay, state.booksList.books.yearsLoaded)
    if (yearsToLoad.length > 0) {
      const response = await apiClient.getBooks({ years: yearsToLoad })
      dispatch(slice.actions.addBooks(response))
    }
    dispatch(slice.actions.setCurrentYear(targetYear))
  }
}

export default slice.reducer
