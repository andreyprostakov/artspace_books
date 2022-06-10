import { slice } from 'widgets/notifications/slice'

export const addSuccessMessage = message => dispatch => {
  dispatch(addMessage({ type: 'success', message: message }))
}

export const addErrorMessage = message => dispatch => {
  dispatch(addMessage({ type: 'danger', message: message }))
}

export const {
  addMessage,
  removeMessage
} = slice.actions
