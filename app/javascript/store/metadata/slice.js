import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'metadata',
  initialState: {
    bookDetailsCurrent: {},
    booksIndexed: {},
    pageIsLoading: false,
    tagsIndexed: {},
    defaultCoverUrl: null,
  },
  reducers: {
    addBook: (state, action) => {
      const book = action.payload
      state.booksIndexed[book.id] = book
    },

    addBooks: (state, action) => {
      const books = action.payload
      books.forEach(book => {
        state.booksIndexed[book.id] = book
      })
    },

    clearBooks: state => {
      state.booksIndexed = {}
    },

    setPageIsLoading: (state, action) => {
      state.pageIsLoading = Boolean(action.payload)
    },

    setTags: (state, action) => {
      const tags = action.payload
      state.tagsIndexed = {}
      tags.forEach(tag => {
        state.tagsIndexed[tag.id] = tag
      })
    },

    setDefaultBookImageUrl: (state, action) => {
      const url = action.payload
      state.defaultCoverUrl = url
    },

    setCurrentBookDetails: (state, action) => {
      state.bookDetailsCurrent = action.payload
    },
  }
})

export default slice.reducer
