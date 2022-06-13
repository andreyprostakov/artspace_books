import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'storeAuthors',
  initialState: {
    authorsFull: {},
    authorsIndex: {},
    authorsRefs: {},
  },
  reducers: {
    addAuthorFull: (state, action) => {
      const authorFull = action.payload
      state.authorsFull[authorFull.id] = authorFull
    },

    addAuthorIndexEntry: (state, action) => {
      const authorIndexEntry = action.payload
      state.authorsIndex[authorIndexEntry.id] = authorIndexEntry
    },

    addAuthorRef: (state, action) => {
      const authorRef = action.payload
      state.authorsRefs[authorRef.id] = authorRef
    },

    assignAuthorsIndex: (state, action) => {
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
  }
})

export default slice.reducer
