import { first, last, max, min } from 'lodash'
import { slice } from 'store/slice'
import { selectYearsToDisplay, selectTargetYear, selectYearsToLoad } from 'store/selectors'
import apiClient from 'serverApi/apiClient'

export const {
  resetSelection,
  setAuthorModalShown,
  setBookModalShown,
  setCurrentAuthorId,
  setDefaultBookImageUrl,
  shiftBookSelection,
  showNewAuthorModal,
  showNewBookModal,
  updateAuthor,
} = slice.actions

export const fetchAuthors = () => async (dispatch, getState) => {
  const response = await apiClient.getAuthors()
  dispatch(slice.actions.setAuthors(response))
}

export const reloadBook = (id) => async (dispatch, getState) => {
  const response = await apiClient.getBook(id)
  dispatch(slice.actions.addBook(response))
}

export const shiftYear = (shift) => changeSelectedYear(state => {
  const { all, current } = state.booksList.years
  const index = all.indexOf(current)
  const targetIndex = max([0, min([all.length - 1, index + shift])])
  return all[targetIndex]
})

export const gotoFirstYear = () => changeSelectedYear(state => first(state.booksList.years.all))

export const gotoLastYear = () => changeSelectedYear(state => last(state.booksList.years.all))

export const initializeList = () => (dispatch) => {
  return showFullList()(dispatch).then(() =>
    dispatch(resetSelection())
  )
}

export const showFullList = () => (dispatch) => {
  return Promise.all([
    dispatch(fetchYears()),
    dispatch(fetchAuthors())
  ]).then(() =>
    dispatch(fetchBooks())
  )
}

export const setCurrentAuthor = authorId => (dispatch, getState) => {
  dispatch(slice.actions.setCurrentAuthorId(authorId))
  Promise.all([
    dispatch(fetchYears({ author_id: authorId }))
  ]).then(() => {
    const years = getState().booksList.years.all
    dispatch(fetchBooks({ years: years, author_id: authorId }))
  })
}

export const loadCurrentAuthorDetails = () => async (dispatch, getState) => {
  const { currentId } = getState().booksList.authors
  if (!currentId) { return }

  const details = await apiClient.getAuthorDetails(currentId)
  dispatch(slice.actions.setCurrentAuthorDetails(details))
}

export const loadNewAuthor = (id) => async (dispatch, getState) => {
  const details = await apiClient.getAuthorDetails(id)
  dispatch(slice.actions.switchToNewAuthor(details))
}

export const loadAuthor = (id) => async (dispatch, getState) => {
  console.log(`loadAuthor ${id}`)
  const author = await apiClient.getAuthor(id)
  dispatch(slice.actions.addAuthor(author))
}

export const loadCurrentBookDetails = () => async (dispatch, getState) => {
  const { currentId } = getState().booksList.books
  if (!currentId) { return }

  const details = await apiClient.getBookDetails(currentId)
  dispatch(slice.actions.setCurrentBookDetails(details))
}

// PRIVATE

const fetchYears = (params = {}) => async (dispatch, getState) => {
  const years = await apiClient.getYears(params)
  dispatch(slice.actions.setYears(years))
}

const fetchBooks = (params = {}) => async (dispatch, getState) => {
  const yearsToDisplay = selectYearsToDisplay()(getState())
  const response = await apiClient.getBooks({ years: yearsToDisplay, ...params })
  dispatch(slice.actions.setBooks(response))
}

const lazyBookLoadIteration = (dispatch, getState, resolve, index = 0) => {
  if (index > 100) {
    resolve([])
    return
  }
  return setTimeout(() => {
    const { yearsToLoad, yearsInLoading } = getState().booksList.books
    const { currentId: currentAuthorId } = getState().booksList.authors
    if (yearsToLoad.length < 1) {
      resolve([])
    } else if (yearsInLoading.length > 0) {
      lazyBookLoadIteration(dispatch, getState, resolve, index + 1)
    } else {
      dispatch(slice.actions.markYearsAsLoading())
      apiClient.getBooks({ years: yearsToLoad, author_id: currentAuthorId }).then((books) => {
        dispatch(slice.actions.markYearsAsLoaded(yearsToLoad))
        resolve(books)
      })
    }
  }, 100 + Math.floor(Math.random() * 100))
}

const loadBooksLazily = (dispatch, getState) =>{
  const { yearsToLoad } = getState().booksList.books
  if (yearsToLoad.length < 1) {
    return []
  } else {
    return new Promise((resolve) => lazyBookLoadIteration(dispatch, getState, resolve))
  }
}

const changeSelectedYear = (selectTargetYear) => async (dispatch, getState) => {
  const state = getState()
  const targetYear = selectTargetYear(state)
  if (!targetYear) { return }

  if (state.booksList.years.current != targetYear) {
    dispatch(slice.actions.setCurrentYear(targetYear))
    dispatch(slice.actions.updateCurrentBookId())
  }

  const yearsToLoad = selectYearsToLoad(targetYear)(state)
  if (yearsToLoad.length < 1) { return }

  dispatch(slice.actions.addYearsToLoad(yearsToLoad))

  const books = await loadBooksLazily(dispatch, getState)
  dispatch(slice.actions.addBooks(books))
  dispatch(slice.actions.updateCurrentBookId())
}
