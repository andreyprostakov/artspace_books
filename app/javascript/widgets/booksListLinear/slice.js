import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'booksListLinear',
  initialState: {
    bookIds: [],
    booksTotal: 0,
    listFilter: {},
    sortBy: 'name',
    page: 1,
    perPage: 16,
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

    changeSortBy: (state, action) => {
      const newSortBy = action.payload
      state.sortBy = newSortBy
    },

    changePage: (state, action) => {
      const page = action.payload
      state.page = page
    },

    changePerPage: (state, action) => {
      const perPage = action.payload
      state.perPage = perPage
    },
  }
})

export default slice.reducer
