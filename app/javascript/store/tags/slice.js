import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'storeTags',
  initialState: {
    tagsRefs: {},
    refsLoaded: false,
  },
  reducers: {
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
