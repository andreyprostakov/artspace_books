import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const HASH = '#edit-hash'

const UrlStore = () => {
  const { actions: { patch, addUrlAction, addRoute, addUrlState },
          helpers: { buildPath },
        } = useContext(UrlStoreContext)

  const route = () => buildPath({ hash: HASH })

  useEffect(() => {
    addRoute('editTagPath', () => buildPath({ hash: HASH }))

    addUrlAction('openEditTagModal', () => patch(route()))

    addUrlState((urlAccessor) => {
      return { modalTagEditShown: urlAccessor.hash === HASH }
    })
  }, [])

  return null
}

export default UrlStore
