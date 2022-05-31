import { difference, find, pull, sort, uniq } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'booksList',
  initialState: {
    booksIndexed: {},

    bookIdsInProcessing: [],

    bookNextId: null,
    bookShiftDirectionHorizontal: null,

    bookIdsCurrentInYear: {},
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

    markBookAsInProcess: (state, action) => {
      const id = action.payload
      state.bookIdsInProcessing.push(id)
    },

    unmarkBookAsInProcess: (state, action) => {
      const id = action.payload
      state.bookIdsInProcessing = pull(state.bookIdsInProcessing, id)
    },

    addYears: (state, action) => {
      const years = action.payload
      state.years = uniq([...state.years, ...years]).sort()
    },

    addYearsToLoad: (state, action) => {
      const years = action.payload
      state.yearsToLoad = uniq([...state.yearsToLoad, ...difference(years, state.yearsLoaded)])
    },

    cleanBooksList: (state, actions) => {
      state.years = []
      state.yearsLoaded = []
      state.booksIndexed = {}
      state.bookIdsCurrentInYear = {}
    },

    clearBooksIndexed: (state, actions) => {
      state.yearsLoaded = []
      state.booksIndexed = {}
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

    setBookShiftDirectionHorizontal: (state, action) => {
      state.bookShiftDirectionHorizontal = action.payload
    },

    setCurrentBookForYear: (state, action) => {
      const { id, year } = action.payload
      state.bookIdsCurrentInYear[year] = id
    },

    setNextBookId: (state, action) => {
      const id = action.payload
      state.bookNextId = id
    },

    setSeed: (state) => { state.seed = Date.now() },

    setYears: (state, action) => state.years = action.payload.slice(),
  }
})

export default slice.reducer
