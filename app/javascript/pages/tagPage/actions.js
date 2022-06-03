import {
  fetchAllTags,
  fetchAuthors,
  setPageIsLoading,
} from 'store/metadata/actions'

import {
  cleanBooksList,
  fetchTagBooks,
  fetchYears,
} from 'widgets/booksList/actions'

import {
  fetchBooks,
  setupBooksListSelection,
} from 'widgets/booksListLinear/actions'

export const setupStoreForTagPage = (tagId, bookId = null) => async (dispatch, getState) => {
  dispatch(setPageIsLoading(true))
  Promise.all([
    dispatch(cleanBooksList()),

    dispatch(fetchAllTags()),
    dispatch(fetchAuthors()),
  ]).then(() =>
    dispatch(fetchBooks({ tagId }))
  ).then(() => {
    dispatch(setPageIsLoading(false))
    dispatch(setupBooksListSelection(bookId))
  })
}
