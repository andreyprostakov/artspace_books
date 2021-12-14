import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'navbar',
  initialState: {
    authorsSearchKey: null,
    tagsSearchKey: null,
  },
  reducers: {
    setAuthorsSearchKey: (state, action) => {
      state.authorsSearchKey = action.payload
    },

    setTagsSearchKey: (state, action) => {
      state.tagsSearchKey = action.payload
    },
  }
})

export default slice.reducer
