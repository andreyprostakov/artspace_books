import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const HASH = '#edit-hash'

const UrlStore = () => {
  const { actions: { patch, addUrlAction, addRoute, addUrlState },
          routes: { editTagPath },
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('editTagPath', () => ({ hash: HASH }))

    addUrlAction('openEditTagModal', routes => () => patch(routes.editTagPath()))

    addUrlState((urlAccessor) => {
      return { modalTagEditShown: urlAccessor.hash === HASH }
    })
  }, [])

  return null
}

export default UrlStore
