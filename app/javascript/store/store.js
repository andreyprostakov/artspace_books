import { configureStore } from '@reduxjs/toolkit'
import axisReducer from 'store/axis/slice'
import metadataReducer from 'store/metadata/slice'
import booksListReducer from 'widgets/booksList/slice'

export default configureStore({
  reducer: {
    axis: axisReducer,
    booksList: booksListReducer,
    metadata: metadataReducer,
  }
})
