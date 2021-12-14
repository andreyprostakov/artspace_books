import {
  fetchAllTags,
  fetchAuthors,
  loadAuthorDetails,
} from 'store/metadata/actions'

import {
  cleanBooksList,
  fetchAuthorBooks,
  fetchAuthorYears,
  setupBooksListSelection,
} from 'widgets/booksList/actions'

import {
  setCurrentAuthorId,
} from 'store/axis/actions'

export const setupStoreForAuthorPage = (authorId, bookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(cleanBooksList()),

    dispatch(fetchAllTags()),
    dispatch(fetchAuthors()),
    dispatch(loadAuthorDetails(authorId)),
    dispatch(fetchAuthorYears(authorId)),
    dispatch(setCurrentAuthorId(authorId)),
  ]).then(() =>
    dispatch(fetchAuthorBooks(authorId))
  ).then(() =>
    dispatch(setupBooksListSelection(bookId))
  )
}
