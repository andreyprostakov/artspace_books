import { configureStore } from '@reduxjs/toolkit'

import authorsBatchReducer from 'pages/authorsPage/slice'

import axisReducer from 'store/axis/slice'
import bookSyncReducer from 'store/bookSync/slice'
import metadataReducer from 'store/metadata/slice'
import selectablesReducer from 'store/selectables/slice'
import storeAuthorsReducer from 'store/authors/slice'
import storeTagsReducer from 'store/tags/slice'

import booksListLinearReducer from 'widgets/booksListLinear/slice'
import booksListYearlyReducer from 'widgets/booksListYearly/slice'
import imageModalReducer from 'widgets/imageModal/slice'
import navbarReducer from 'widgets/navbar/slice'
import notificationsReducer from 'widgets/notifications/slice'

export default configureStore({
  reducer: {
    authorsBatch: authorsBatchReducer,
    axis: axisReducer,
    booksListLinear: booksListLinearReducer,
    booksListYearly: booksListYearlyReducer,
    bookSync: bookSyncReducer,
    imageModal: imageModalReducer,
    metadata: metadataReducer,
    navbar: navbarReducer,
    notifications: notificationsReducer,
    selectables: selectablesReducer,
    storeAuthors: storeAuthorsReducer,
    storeTags: storeTagsReducer,
  }
})
