import { configureStore } from '@reduxjs/toolkit'

import axisReducer from 'store/axis/slice'
import bookSyncReducer from 'store/bookSync/slice'
import metadataReducer from 'store/metadata/slice'
import selectablesReducer from 'store/selectables/slice'
import storeAuthorsReducer from 'store/authors/slice'
import storeBooksReducer from 'store/books/slice'
import storeTagsReducer from 'store/tags/slice'

import booksListLinearReducer from 'widgets/booksListLinear/slice'
import booksListYearlyReducer from 'widgets/booksListYearly/slice'
import navbarReducer from 'widgets/navbar/slice'
import notificationsReducer from 'widgets/notifications/slice'

import imageModalReducer from 'modals/imageFullShow/slice'

export default configureStore({
  reducer: {
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
    storeBooks: storeBooksReducer,
    storeTags: storeTagsReducer,
  }
})
