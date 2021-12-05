import { configureStore } from '@reduxjs/toolkit'
import axisReducer from 'store/axis/slice'
import authorsListReducer from 'store/authorsList/slice'
import booksListReducer from 'store/slice'

export default configureStore({
  reducer: {
    axis: axisReducer,
    authorsList: authorsListReducer,
    booksList: booksListReducer
  }
})
