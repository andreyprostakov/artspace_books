import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'metadata',
  initialState: {
    authorDetailsCurrent: {},
    authorsIndexed: {},
    tagsIndexed: {},
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

    setTags: (state, action) => {
      const tags = action.payload
      state.tagsIndexed = {}
      tags.forEach(tag => state.tagsIndexed[tag.id] = tag)
    }
  }
})

export default slice.reducer
