import { configureStore } from '@reduxjs/toolkit'
import booksListReducer from 'store/slice'

export default configureStore({
  reducer: {
    booksList: booksListReducer
  }
})
