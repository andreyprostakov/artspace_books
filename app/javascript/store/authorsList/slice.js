import { createSlice } from '@reduxjs/toolkit'
import { BY_NAME_ASCENDING } from 'store/authorsList/sortOrders'

export const slice = createSlice({
  name: 'authorsList',
  initialState: {
    sortOrder: BY_NAME_ASCENDING
  },
  reducers: {
    setSortOrder: (state, action) => {
      const newOrder = action.payload
      state.sortOrder = newOrder
    },
  }
})

export default slice.reducer
