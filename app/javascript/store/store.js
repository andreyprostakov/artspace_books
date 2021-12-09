import { configureStore } from '@reduxjs/toolkit'
import axisReducer from 'store/axis/slice'
import booksListReducer from 'store/slice'
import booksListWidgetReducer from 'widgets/booksList/slice'

export default configureStore({
  reducer: {
    axis: axisReducer,
    booksList: booksListReducer,
    booksListWidget: booksListWidgetReducer,
  }
})
