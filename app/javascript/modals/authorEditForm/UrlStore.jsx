import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const HASH = '#edit-author'

const EditAuthorUrlStore = () => {
  const { actions: { patch, addUrlAction, addRoute, addUrlState }, getRoutes } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('editAuthorPath', () => getRoutes().modalOpenPath(HASH))

    addUrlAction('openEditAuthorModal', () => patch(getRoutes().editAuthorPath()))

    addUrlState('modalAuthorEditShown', (url) => url.hash === HASH)
  }, [])

  return null
}

export default EditAuthorUrlStore
