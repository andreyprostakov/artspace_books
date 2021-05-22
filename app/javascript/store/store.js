import { configureStore } from '@reduxjs/toolkit'
import booksListReducer from 'store/booksListSlice'

export default configureStore({
  reducer: {
    booksList: booksListReducer
  }
})
