import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'urlStore',
  initialState: {
    pathsDefinitions: {},
    actionsDefinitions: {},
    pageState: {},
    pageStateDefinitions: {},
  },
  reducers: {
    definePath: (state, action) => {
      const [name, definer] = action.payload
      state.pathsDefinitions[name] = definer
    },

    defineAction: (state, action) => {
      const [name, definer] = action.payload
      state.actionsDefinitions[name] = definer
    },

    definePageState: (state, action) => {
      const definer = action.payload
      state.pageStateDefinitions = [...state.pageStateDefinitions, definer]
    },

    resolvePageState: (state, action) => {
      const { params, query, location } = action.payload
      state.pageStateDefinitions.forEach(stateDefinition => {
        state.pageState = { ...state.pageState, ...stateDefinition({ params, query, location }) }
      })
    },
  }
})

export default slice.reducer
