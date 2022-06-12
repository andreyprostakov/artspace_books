import { slice } from 'store/bookSync/slice'
import { selectBookIdsInProcessing } from 'store/bookSync/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'
import { selectBook } from 'store/metadata/selectors'
import { addBook } from 'store/metadata/actions'
import apiClient from 'serverApi/apiClient'
import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'

const {
  markBookAsInProcess,
  unmarkBookAsInProcess,
} = slice.actions

export const syncBookStats = id => (dispatch, getState) => {
  const state = getState()
  const ids = selectBookIdsInProcessing()(state)
  if (ids.includes(id)) return

  const initialBook = selectBook(id)(state)
  dispatch(markBookAsInProcess(id))
  dispatch(reloadBookWithSync(id, initialBook)).then(book => {
    dispatch(addBook(book))
    dispatch(unmarkBookAsInProcess(id))
  })
}

const reloadBookWithSync = (id, initialBook) => async dispatch => {
  const apiCall = apiClient.syncBookStats(id).
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

  dispatch(syncBookStats(id))
}
