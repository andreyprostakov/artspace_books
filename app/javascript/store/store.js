import { configureStore } from '@reduxjs/toolkit'
import axisReducer from 'store/axis/slice'
import booksListReducer from 'store/slice'

export default configureStore({
  reducer: {
    axis: axisReducer,
    booksList: booksListReducer
  }
})
