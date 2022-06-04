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
  assignFilter,
  fetchBooks,
  setupBooksListSelection,
} from 'widgets/booksListLinear/actions'

export const setupStoreForTagPage = (tagId, bookId = null) => async (dispatch, getState) => {
  dispatch(setPageIsLoading(true))
  Promise.all([
    dispatch(cleanBooksList()),

    dispatch(fetchAllTags()),
    dispatch(fetchAuthors()),
  ]).then(() => {
    dispatch(assignFilter({ tagId }))
    dispatch(fetchBooks()).then(() => {
      dispatch(setPageIsLoading(false))
      dispatch(setupBooksListSelection(bookId))
    })
  })
}
