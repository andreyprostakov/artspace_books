import { slice } from 'store/bookSync/slice'
import { selectBookIdsInProcessing } from 'store/bookSync/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'
import { selectBooksIndexEntry } from 'store/books/selectors'
import { addBook } from 'store/books/actions'
import apiClient from 'store/books/apiClient'
import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'

const {
  markBookAsInProcess,
  unmarkBookAsInProcess,
} = slice.actions

export const updateBookPopularity = id => (dispatch, getState) => {
  const state = getState()
  const ids = selectBookIdsInProcessing()(state)
  if (ids.includes(id)) return

  const initialBook = selectBooksIndexEntry(id)(state)
  dispatch(markBookAsInProcess(id))
  dispatch(reloadBookWithSync(id, initialBook)).then(book => {
    dispatch(addBook(book))
    dispatch(unmarkBookAsInProcess(id))
  })
}

const reloadBookWithSync = (id, initialBook) => async dispatch => {
  const apiCall = apiClient.updateBookPopularity(id).
    fail(response => {
      dispatch(addErrorMessage(`Book #${id} not synced due to some failure`))
      return response
    }).
    then(reloadedBook => {
      const diff = reloadedBook.popularity - initialBook.popularity
      dispatch(addSuccessMessage(`Book #${id} synced! Difference: ${diff}pts`))
      return reloadedBook
    })
  const result = await Promise.race(
    [
      apiCall,
      new Promise(resolve => {
        setTimeout(() => resolve(null), 10000)
      })
    ]
  )
  if (result === null)
    dispatch(addErrorMessage(`Book #${id} not synced due to timeout failure`))
  return result
}

export const syncCurrentBookStats = () => (dispatch, getState) => {
  const id = selectCurrentBookId()(getState())
  if (!id) return

  dispatch(updateBookPopularity(id))
}
