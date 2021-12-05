import { createSlice } from '@reduxjs/toolkit'

// AXIS are registries holding current navigational cross-page info

export const slice = createSlice({
  name: 'axis',
  initialState: {
    currentAuthorId: null
  },
  reducers: {
    setCurrentAuthorId: (state, action) => {
      const id = action.payload
      state.currentAuthorId = id
    },
  }
})

export default slice.reducer
