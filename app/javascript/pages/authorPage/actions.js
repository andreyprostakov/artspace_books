import {
  cleanBooksList,
  cleanYearsList,
  fetchAllTags,
  fetchAuthors,
  fetchAuthorBooks,
  fetchAuthorYears,
  loadAuthorDetails,
  pickCurrentBookFromLatestYear,
  reloadBook,
} from 'store/actions'
import {
  setCurrentAuthorId,
  setCurrentBookId,
} from 'store/axis/actions'
import { selectBooks } from 'store/selectors'

export const setupStoreForAuthorPage = (authorId, currentBookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(cleanYearsList()),
    dispatch(cleanBooksList()),

    dispatch(fetchAllTags()),
    dispatch(fetchAuthors()),
    dispatch(loadAuthorDetails(authorId)),
    dispatch(fetchAuthorYears(authorId)),
    dispatch(setCurrentAuthorId(authorId)),
  ]).then(() => {
    dispatch(fetchAuthorBooks(authorId))
    const authorBookIds = selectBooks()(getState()).filter(book => book.authorId == authorId).map(book => book.id)
    if (currentBookId && authorBookIds.includes(currentBookId)) {
      dispatch(reloadBook(currentBookId))
      dispatch(setCurrentBookId(currentBookId))
    } else {
      dispatch(pickCurrentBookFromLatestYear())
    }
  })
}
