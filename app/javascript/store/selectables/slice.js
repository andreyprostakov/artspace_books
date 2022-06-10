import { pull } from 'lodash'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'selectables',
  initialState: {
    idsSelected: [],
  },
  reducers: {
    selectId: (state, action) => {
      const id = action.payload
      state.idsSelected.push(id)
    },

    unselectId: (state, action) => {
      const id = action.payload
      state.idsSelected = pull(state.idsSelected, id)
    },

    clearSelection: (state) => {
      state.idsSelected = []
    },
  }
})

export default slice.reducer
