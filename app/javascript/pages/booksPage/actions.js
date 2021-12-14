import {
  setCurrentAuthorId,
} from 'store/axis/actions'

import {
  fetchAllTags,
  fetchAuthors,
} from 'store/metadata/actions'

import {
  cleanBooksList,
  fetchYears,
  reloadBook,
  setupBooksListSelection,
} from 'widgets/booksList/actions'

export const setupStoreForBooksPage = (bookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(cleanBooksList()),
    dispatch(setCurrentAuthorId(null)),

    dispatch(fetchAllTags()),
    dispatch(fetchYears()),
    dispatch(fetchAuthors()),
  ]).then(() =>
    bookId && dispatch(reloadBook(bookId))
  )
}
