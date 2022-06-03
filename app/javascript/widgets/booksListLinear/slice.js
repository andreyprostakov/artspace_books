import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'booksListLinear',
  initialState: {
    bookIds: [],
  },
  reducers: {
    assignBooks: (state, action) => {
      const books = action.payload
      state.bookIds = books.map(book => book.id)
    },
  }
})

export default slice.reducer
