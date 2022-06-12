import { difference, uniq } from 'lodash'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'booksListYearly',
  initialState: {
    bookShiftDirectionHorizontal: null,
    bookIdsCurrentInYear: {},
    filters: {},
    years: [],
    yearsInLoading: [],
    yearsLoaded: [],
    yearsToLoad: [],
  },
  reducers: {
    markBooksYearsAsLoaded: (state, action) => {
      const books = action.payload
      state.yearsLoaded = uniq([...state.yearsLoaded, ...books.map(b => b.year)])
    },

    addYears: (state, action) => {
      const years = action.payload
      state.years = uniq([...state.years, ...years]).sort()
    },

    addYearsToLoad: (state, action) => {
      const years = action.payload
      state.yearsToLoad = uniq([...state.yearsToLoad, ...difference(years, state.yearsLoaded)])
    },

    clearState: state => {
      state.bookShiftDirectionHorizontal = null
      state.bookIdsCurrentInYear = {}
      state.years = []
      state.yearsLoaded = []
      state.yearsInLoading = []
      state.yearsToLoad = []
    },

    markYearsAsLoading: state => {
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

    setFilters: (state, action) => {
      const filters = action.payload
      state.filters = filters
    },

    setYears: (state, action) => {
      state.years = action.payload.slice()
    },
  }
})

export default slice.reducer
