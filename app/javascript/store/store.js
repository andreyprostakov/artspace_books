import { configureStore } from '@reduxjs/toolkit'
import axisReducer from 'store/axis/slice'
import booksListReducer from 'widgets/booksList/slice'
import metadataReducer from 'store/metadata/slice'
import navbarReducer from 'widgets/navbar/slice'

export default configureStore({
  reducer: {
    axis: axisReducer,
    booksList: booksListReducer,
    metadata: metadataReducer,
    navbar: navbarReducer,
  }
})
