import { configureStore } from '@reduxjs/toolkit'

import authorsBatchReducer from 'pages/authorsPage/slice'

import axisReducer from 'store/axis/slice'
import metadataReducer from 'store/metadata/slice'
import selectablesReducer from 'store/selectables/slice'

import booksListReducer from 'widgets/booksList/slice'
import imageModalReducer from 'widgets/imageModal/slice'
import navbarReducer from 'widgets/navbar/slice'
import notificationsReducer from 'widgets/notifications/slice'

export default configureStore({
  reducer: {
    authorsBatch: authorsBatchReducer,
    axis: axisReducer,
    booksList: booksListReducer,
    imageModal: imageModalReducer,
    metadata: metadataReducer,
    navbar: navbarReducer,
    notifications: notificationsReducer,
    selectables: selectablesReducer,
  }
})
