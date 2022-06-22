import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const HASH = '#new-book'

const NewBookUrlStore = () => {
  const { actions: { patch, addUrlAction, addRoute, addUrlState }, getRoutes } = useContext(UrlStoreContext)


  useEffect(() => {
    addRoute('newBookPath', () => getRoutes().modalOpenPath(HASH))

    addUrlAction('openNewBookModal', () => patch(getRoutes().newBookPath()))

    addUrlState('modalBookNewShown', (url) => url.hash === HASH)
  }, [])

  return null
}

export default NewBookUrlStore
