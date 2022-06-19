import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const UrlStore = () => {
  const { actions: { patch, addUrlAction },
          helpers: { buildPath },
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addUrlAction('closeModal', () => {
      patch(buildPath({ hash: '' }))
    })

    addUrlAction('openModal', (modalHash) =>
      patch(buildPath({ hash: modalHash }))
    )
  }, [])

  return null
}

export default UrlStore
