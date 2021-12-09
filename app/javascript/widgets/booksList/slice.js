import { createSlice } from '@reduxjs/toolkit'

// AXIS are registries holding current navigational cross-page info

export const slice = createSlice({
  name: 'booksListWidget',
  initialState: {
    nextBookId: null,
  },
  reducers: {
    setNextBookId: (state, action) => {
      const id = action.payload
      state.nextBookId = id
    },
  }
})

export default slice.reducer
