import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const UrlStore = () => {
  const { actions: { patch, addRoute, addUrlAction },
          getRoutes,
          helpers: { buildRelativePath },
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('modalClosedPath', () => buildRelativePath({ hash: '' }))

    addRoute('modalOpenPath', (modalHash) => buildRelativePath({ hash: modalHash }))

    addUrlAction('closeModal', () => {
      patch(getRoutes().modalClosedPath())
    })

    addUrlAction('openModal', (modalHash) =>
      patch(getRoutes().modalOpenPath(modalHash))
    )
  }, [])

  return null
}

export default UrlStore
