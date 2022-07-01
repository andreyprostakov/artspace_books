import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'navbar',
  initialState: {
    tagsSearchKey: null,
  },
  reducers: {
    setTagsSearchKey: (state, action) => {
      state.tagsSearchKey = action.payload
    },
  }
})

export default slice.reducer
