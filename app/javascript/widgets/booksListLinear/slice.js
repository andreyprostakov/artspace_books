import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_SORT_BY = 'name'
const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 16

export const slice = createSlice({
  name: 'booksListLinear',
  initialState: {
    bookIds: [],
    booksTotal: 0,
    listFilter: {},
    sortBy: DEFAULT_SORT_BY,
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE,
  },
  reducers: {
    assignBooks: (state, action) => {
      const books = action.payload
      state.bookIds = books.map(book => book.id)
    },

    assignBooksTotal: (state, action) => {
      const number = action.payload
      state.booksTotal = number
    },

    assignFilter: (state, action) => {
      const filterQuery = action.payload
      state.listFilter = filterQuery
    },

    assignSortBy: (state, action) => {
      const newSortBy = action.payload || DEFAULT_SORT_BY
      state.sortBy = newSortBy
    },

    assignPage: (state, action) => {
      const page = action.payload || DEFAULT_PAGE
      state.page = page
    },

    assignPerPage: (state, action) => {
      const perPage = action.payload || DEFAULT_PER_PAGE
      state.perPage = perPage
    },

    clearState: (state, actions) => {
      state.bookIds = []
      state.booksTotal = 0
      state.listFilter = {}
      state.page = DEFAULT_PAGE
    },
  }
})

export default slice.reducer
