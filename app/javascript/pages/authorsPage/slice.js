import { pull } from 'lodash'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'authorsBatch',
  initialState: {
    batchMode: false,
    selectedIds: [],
  },
  reducers: {
    setBatchMode: (state, action) => {
      state.batchMode = !!action.payload
    },

    addId: (state, action) => {
      const id = action.payload
      state.selectedIds.push(id)
    },

    removeId: (state, action) => {
      const id = action.payload
      state.selectedIds = pull(state.selectedIds, id)
    },
  }
})

export default slice.reducer
