import {
  fetchAllTags,
  fetchAuthors,
} from 'store/metadata/actions'

import {
  setCurrentBookId,
} from 'store/axis/actions'

import {
  cleanBooksList,
  fetchTagBooks,
  fetchYears,
  pickCurrentBookFromLatestYear,
  setupBooksListSelection,
} from 'widgets/booksList/actions'

export const setupStoreForTagPage = (tagId, bookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(cleanBooksList()),

    dispatch(fetchAllTags()),
    dispatch(fetchYears({ tagId })),
    dispatch(fetchAuthors()),
  ]).then(() =>
    dispatch(fetchTagBooks(tagId))
  ).then(() =>
    dispatch(setupBooksListSelection(bookId))
  )
}
