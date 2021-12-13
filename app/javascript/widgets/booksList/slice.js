import { difference, find, sort, uniq } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'booksList',
  initialState: {
    bookDetailsCurrent: {},
    bookIdsCurrentInYear: {},
    bookInSyncId: null,
    bookNextId: null,
    booksIndexed: {},
    defaultCoverUrl: null,
    seed: null,
    years: [],
    yearsInLoading: [],
    yearsLoaded: [],
    yearsToLoad: [],
  },
  reducers: {
    addBook: (state, action) => {
      const book = action.payload
      state.booksIndexed[book.id] = book
    },

    addBooks: (state, action) => {
      const { seed } = state
      const books = shuffle(action.payload, seed)
      books.forEach(book => {
        state.booksIndexed[book.id] = book
        state.yearsLoaded.push(book.year)
      })
    },

    addYears: (state, action) => {
      const years = action.payload
      state.years = uniq([...state.years, ...years]).sort()
    },

    addYearsToLoad: (state, action) => {
      const years = action.payload
      state.yearsToLoad = [...state.yearsToLoad, ...difference(years, state.yearsLoaded)]
    },

    cleanBooksList: (state, actions) => {
      state.years = []
      state.yearsLoaded = []
      state.booksIndexed = {}
      state.bookIdsCurrentInYear = {}
    },

    markYearsAsLoading: (state, action) => {
      const years = state.yearsToLoad
      state.yearsToLoad = []
      state.yearsInLoading = uniq([...state.yearsInLoading, ...years])
    },

    markYearsAsLoaded: (state, action) => {
      const years = action.payload
      state.yearsLoaded = uniq([...state.yearsLoaded, ...years])
      state.yearsInLoading = difference(state.yearsInLoading, years)
    },

    setCurrentBookDetails: (state, action) => {
      state.bookDetailsCurrent = action.payload
    },

    setCurrentBookForYear: (state, action) => {
      const { id, year } = action.payload
      state.bookIdsCurrentInYear[year] = id
    },

    setDefaultBookImageUrl: (state, action) => {
      const url = action.payload
      state.defaultCoverUrl = url
    },

    setNextBookId: (state, action) => {
      const id = action.payload
      state.bookNextId = id
    },

    setSeed: (state) => { state.seed = Date.now() },

    setSyncedBookId: (state, action) => {
      const id = action.payload
      state.bookInSyncId = id
    },

    setYears: (state, action) => state.years = action.payload.slice(),
  }
})

export default slice.reducer
