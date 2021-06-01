import { difference, find, last, sort, uniq } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'booksList',
  initialState: {
    seed: null,
    books: {
      byIds: {},
      currentId: null,
      currentDetails: {},
      yearsLoaded: [],
      yearsToLoad: [],
      yearsInLoading: [],
      defaultImageUrl: null
    },
    years: {
      all: []
    },
    authors: {
      byIds: {},
      currentId: null,
      currentDetails: {}
    }
  },
  reducers: {
    setSeed: (state) => { state.seed = Date.now() },

    addYears: (state, action) => {
      const years = action.payload
      state.years.all = uniq([...state.years.all, ...years])
    },

    addYearsToLoad: (state, action) => {
      const years = action.payload
      state.books.yearsToLoad = [...state.books.yearsToLoad, ...difference(years, state.books.yearsLoaded)]
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

    setAuthors: (state, action) => {
      const authors = action.payload
      state.authors.byIds = {}
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

    addAuthor: (state, action) => {
      const author = action.payload
      state.authors.byIds[author.id] = author
    },

    addBook: (state, action) => {
      const book = action.payload
      const { year: bookYear } = book
      const { all: allYears } = state.years
      const previousCurrentBook = state.books.byIds[state.books.currentId]
      const previousCurrentYear = previousCurrentBook?.year

      state.books.byIds[book.id] = book
      state.books.currentId = book.id
      if (!allYears.includes(bookYear)) {
        state.years.all = [...allYears, bookYear].sort()
        state.books.yearsLoaded = [...state.books.yearsLoaded, bookYear]
      }

      if (previousCurrentYear && previousCurrentYear !== bookYear) {
        const yearBook = Object.values(state.books.byIds).find(book => book.year == previousCurrentYear)
        if (!yearBook) {
          state.years.all = state.years.all.filter(year => year != previousCurrentYear)
        }
      }
    },

    addBooks: (state, action) => {
      const { seed } = state
      const books = shuffle(action.payload, seed)
      books.forEach(book => {
        state.books.byIds[book.id] = book
        state.books.yearsLoaded.push(book.year)
      })
    },

    cleanBooksList: (state, actions) => {
      state.books.byIds = {}
      state.books.currentId = null
      state.books.yearsLoaded = []
    },

    cleanYearsList: (state, action) => {
      state.years.all = []
      state.years.current = null
    },

    setDefaultBookImageUrl: (state, action) => {
      const url = action.payload
      state.books.defaultImageUrl = url
    },

    setCurrentBookId: (state, action) => {
      const id = action.payload
      state.books.currentId = id
    },

    setCurrentBookDetails: (state, action) => {
      const details = action.payload
      state.books.currentDetails = details
    }
  }
})

export default slice.reducer
