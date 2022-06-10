import { slice } from 'store/bookSync/slice'
import { selectBookIdsInProcessing } from 'store/bookSync/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'
import { addBook } from 'store/metadata/actions'
import apiClient from 'serverApi/apiClient'
import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'

const {
  markBookAsInProcess,
  unmarkBookAsInProcess,
} = slice.actions

export const syncBookStats = (id) => async (dispatch, getState) => {
  const ids = selectBookIdsInProcessing()(getState())
  if (ids.includes(id)) { return }

  dispatch(markBookAsInProcess(id))
  dispatch(reloadBookWithSync(id)).then((book) => {
    dispatch(addBook(book))
    dispatch(unmarkBookAsInProcess(id))
  })
}

const reloadBookWithSync = (id) => async (dispatch) => {
  const apiCall = apiClient.syncBookStats(id)
    .fail(response => {
      dispatch(addErrorMessage(`Book #${id} not synced due to some failure`))
      return response
    })
    .then(book => {
      dispatch(addSuccessMessage(`Book #${id} synced`))
      return book
    })
  const result = await Promise.race(
    [
      apiCall,
      new Promise((resolve) => setTimeout(() => resolve(null), 10000))
    ]
  )
  if (result === null) { dispatch(addErrorMessage(`Book #${id} not synced due to timeout failure`)) }
  return result
}

export const syncCurrentBookStats = () => async (dispatch, getState) => {
  const id = selectCurrentBookId()(getState())
  if (!id) { return }

  dispatch(syncBookStats(id))
}
