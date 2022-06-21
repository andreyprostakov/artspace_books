import React, { useContext, useEffect } from 'react'

import UrlStoreContext from 'store/urlStore/Context'

const HASH = '#edit-hash'

const EditTagUrlStore = () => {
  const { actions: { patch, addUrlAction, addRoute, addUrlState },
          getRoutes,
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('editTagPath', () => getRoutes().modalOpenPath(HASH))

    addUrlAction('openEditTagModal', () => patch(getRoutes().editTagPath()))

    addUrlState((urlAccessor) => {
      return { modalTagEditShown: urlAccessor.hash === HASH }
    })
  }, [])

  return null
}

export default EditTagUrlStore
