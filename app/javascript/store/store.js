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
import booksListYearsRefsReducer from 'widgets/booksListYearly/refsLoader/slice'
import notificationsReducer from 'widgets/notifications/slice'

import imageModalReducer from 'modals/imageFullShow/slice'

import authorsPageReducer from 'pages/authorsPage/slice'

export default configureStore({
  reducer: {
    authorsPage: authorsPageReducer,
    axis: axisReducer,
    booksListLinear: booksListLinearReducer,
    booksListYearly: booksListYearlyReducer,
    booksListYearlyRefs: booksListYearsRefsReducer,
    bookSync: bookSyncReducer,
    imageModal: imageModalReducer,
    metadata: metadataReducer,
    notifications: notificationsReducer,
    selectables: selectablesReducer,
    storeAuthors: storeAuthorsReducer,
    storeBooks: storeBooksReducer,
    storeTags: storeTagsReducer,
  }
})
