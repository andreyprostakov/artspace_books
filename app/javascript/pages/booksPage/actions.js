import {
  cleanBooksList,
  cleanYearsList,
  fetchAllTags,
  fetchYears,
  fetchAuthors,
  pickCurrentBookFromLatestYear,
  reloadBook,
} from 'store/actions'
import {
  setCurrentAuthorId,
  setCurrentBookId,
} from 'store/axis/actions'

export const setupStoreForBooksPage = (currentBookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(cleanYearsList()),
    dispatch(cleanBooksList()),
    dispatch(setCurrentAuthorId(null)),

    dispatch(fetchAllTags()),
    dispatch(fetchYears()),
    dispatch(fetchAuthors())
  ]).then(() => {
    if (currentBookId) {
      dispatch(setCurrentBookId(currentBookId))
      dispatch(reloadBook(currentBookId))
    } else {
      dispatch(pickCurrentBookFromLatestYear())
    }
  })
}
