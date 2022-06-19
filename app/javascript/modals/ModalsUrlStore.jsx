import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const UrlStore = () => {
  const { actions: { patch, addRoute, addUrlAction },
          routes: { modalOpenPath, modalClosedPath }
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('modalClosedPath', () => ({ hash: '' }))

    addRoute('modalOpenPath', (modalHash) => ({ hash: modalHash }))

    addUrlAction('closeModal', routes => () => {
      patch(routes.modalClosedPath())
    })

    addUrlAction('openModal', routes => (modalHash) =>
      patch(routes.modalOpenPath(modalHash))
    )
  }, [])

  return null
}

export default UrlStore
