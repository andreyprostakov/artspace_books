import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'metadata',
  initialState: {
    authorDetailsCurrent: {},
    authorsIndexed: {},
    bookDetailsCurrent: {},
    pageIsLoading: false,
    tagsIndexed: {},
    defaultCoverUrl: null,
  },
  reducers: {
    addAuthor: (state, action) => {
      const author = action.payload
      state.authorsIndexed[author.id] = author
    },

    setAuthors: (state, action) => {
      const authors = action.payload
      state.authorsIndexed = {}
      authors.forEach(author => state.authorsIndexed[author.id] = author)
    },

    setCurrentAuthorDetails: (state, action) => {
      state.authorDetailsCurrent = action.payload
    },

    setPageIsLoading: (state, action) => {
      state.pageIsLoading = !!action.payload
    },

    setTags: (state, action) => {
      const tags = action.payload
      state.tagsIndexed = {}
      tags.forEach(tag => state.tagsIndexed[tag.id] = tag)
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
