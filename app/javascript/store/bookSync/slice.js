import { pull } from 'lodash'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'bookSync',
  initialState: {
    bookIdsInProcessing: [],
  },
  reducers: {
    markBookAsInProcess: (state, action) => {
      const id = action.payload
      state.bookIdsInProcessing.push(id)
    },

    unmarkBookAsInProcess: (state, action) => {
      const id = action.payload
      state.bookIdsInProcessing = pull(state.bookIdsInProcessing, id)
    },
  }
})

export default slice.reducer
