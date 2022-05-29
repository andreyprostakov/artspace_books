import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AlertList, Alert, AlertContainer } from 'react-bs-notifier'

import { removeMessage } from 'widgets/notifications/actions'
import { selectMessages } from 'widgets/notifications/selectors'

const Notifications = () => {
  const messages = useSelector(selectMessages())
  const dispatch = useDispatch()
  const onDismiss = (message) => dispatch(removeMessage(message.id))
  return (
    <AlertList
      position='top-right'
      alerts={ messages }
      timeout={ 5000 }
      dismissTitle='Close'
      onDismiss={ onDismiss }
    />
  )
}

export default Notifications
