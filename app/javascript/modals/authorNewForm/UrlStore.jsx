import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const HASH = '#new-author'

const NewAuthorUrlStore = () => {
  const { actions: { patch, addUrlAction, addRoute, addUrlState }, getRoutes } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('newAuthorPath', () => getRoutes().modalOpenPath(HASH))

    addUrlAction('openNewAuthorModal', () => patch(getRoutes().newAuthorPath()))

    addUrlState('modalAuthorNewShown', (url) => url.hash === HASH)
  }, [])

  return null
}

export default NewAuthorUrlStore
