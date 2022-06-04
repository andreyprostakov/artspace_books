import { createSlice } from '@reduxjs/toolkit'

// AXIS are registries holding current navigational cross-page info

export const slice = createSlice({
  name: 'axis',
  initialState: {
    currentAuthorId: null,
    currentBookId: null,
    currentTagId: null,
  },
  reducers: {
    setCurrentAuthorId: (state, action) => {
      const id = action.payload
      state.currentAuthorId = id
    },

    setCurrentBookId: (state, action) => {
      const id = action.payload
      state.currentBookId = id
    },

    setCurrentTagId: (state, action) => {
      const id = action.payload
      state.currentTagId = id
    },
  }
})

export default slice.reducer
