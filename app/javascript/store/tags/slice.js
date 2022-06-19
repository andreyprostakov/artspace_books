import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'storeTags',
  initialState: {
    tagsIndex: {},
    tagsCategoriesIndex: {},
    tagsRefs: {},
    refsLoaded: false,
  },
  reducers: {
    assignTagsIndex: (state, action) => {
      const entries = action.payload
      state.tagsIndex = {}
      state.tagsCategoriesIndex = {}
      entries.forEach(entry => {
        state.tagsIndex[entry.id] = entry
        state.tagsCategoriesIndex[entry.category] ||= []
        state.tagsCategoriesIndex[entry.category].push(entry)
      })
    },

    assignTagsRefs: (state, action) => {
      const tagsRefs = action.payload
      state.tagsRefs = {}
      tagsRefs.forEach(tagRef => {
        state.tagsRefs[tagRef.id] = tagRef
      })
      state.refsLoaded = true
    },
  }
})

export default slice.reducer
