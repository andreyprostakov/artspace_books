import {
  setCurrentAuthorId,
} from 'store/axis/actions'

import {
  fetchAllTags,
  fetchAuthors,
  setPageIsLoading,
} from 'store/metadata/actions'

import {
  cleanBooksList,
  fetchYears,
  reloadBook,
  setupBooksListSelection,
} from 'widgets/booksList/actions'

export const setupStoreForBooksPage = (bookId = null) => async (dispatch, getState) => {
  dispatch(setPageIsLoading(true))
  Promise.all([
    dispatch(cleanBooksList()),
    dispatch(setCurrentAuthorId(null)),

    dispatch(fetchAllTags()),
    dispatch(fetchYears()),
    dispatch(fetchAuthors()),
  ]).then(() =>
    bookId && dispatch(reloadBook(bookId))
  ).then(() =>
    dispatch(setPageIsLoading(false))
  )
}
