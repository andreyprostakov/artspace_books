import {
  cleanBooksList,
  cleanYearsList,
  fetchAllTags,
  fetchYears,
  fetchAuthors,
  pickCurrentBookFromLatestYear,
  reloadBook,
  setCurrentBookId,
} from 'store/actions'
import { setCurrentAuthorId } from 'store/axis/actions'

export const setupStoreForBooksPage = (currentBookId = null) => async (dispatch, getState) => {
  if (currentBookId) { console.log(`setupStoreForBooksPage book_id ${currentBookId}!`) }
  Promise.all([
    dispatch(cleanYearsList()),
    dispatch(cleanBooksList()),
    dispatch(setCurrentAuthorId(null)),

    dispatch(fetchAllTags()),
    dispatch(fetchYears()),
    dispatch(fetchAuthors())
  ]).then(() => {
    if (currentBookId) {
      dispatch(reloadBook(currentBookId))
      dispatch(setCurrentBookId(currentBookId))
    } else {
      dispatch(pickCurrentBookFromLatestYear())
    }
  })
}
