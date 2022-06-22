import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const HASH = '#edit-book'

const EditBookUrlStore = () => {
  const { actions: { patch, addUrlAction, addRoute, addUrlState }, getRoutes } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('editBookPath', () => getRoutes().modalOpenPath(HASH))

    addUrlAction('openEditBookModal', () => patch(getRoutes().editBookPath()))

    addUrlState('modalBookEditShown', (url) => url.hash === HASH)
  }, [])

  return null
}

export default EditBookUrlStore
