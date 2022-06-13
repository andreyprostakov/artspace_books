import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'metadata',
  initialState: {
    authorsFull: {},
    authorsIndex: {},
    authorsRefs: {},
    bookDetailsCurrent: {},
    booksIndexed: {},
    pageIsLoading: false,
    tagsIndexed: {},
    defaultCoverUrl: null,
  },
  reducers: {
    addAuthorFull: (state, action) => {
      const authorFull = action.payload
      state.authorsRefs[authorFull.id] = authorFull
    },

    addAuthorIndexEntry: (state, action) => {
      const authorIndexEntry = action.payload
      state.authorsIndex[authorIndexEntry.id] = authorIndexEntry
    },

    addAuthorRef: (state, action) => {
      const authorRef = action.payload
      state.authorsRefs[authorRef.id] = authorRef
    },

    assignAuthorsIndexEntries: (state, action) => {
      const authorIndexEntries = action.payload
      state.authorsIndex = {}
      authorIndexEntries.forEach(authorIndexEntry => {
        state.authorsIndex[authorIndexEntry.id] = authorIndexEntry
      })
    },

    assignAuthorsRefs: (state, action) => {
      const refs = action.payload
      state.authorsRefs = {}
      refs.forEach(authorRef => {
        state.authorsRefs[authorRef.id] = authorRef
      })
    },

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
