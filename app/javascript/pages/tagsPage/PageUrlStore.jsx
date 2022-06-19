import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setCurrentTagId } from 'store/axis/actions'
import UrlStoreContext from 'store/urlStore/Context'

const UrlStore = () => {
  const dispatch = useDispatch()
  const { pageState: { tagId = null },
          actions: { patch, addUrlAction, addUrlState },
          helpers: { buildPath },
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addUrlAction('selectTag', (id) =>
      patch(buildPath({ params: { 'tag_id': id } }))
    )

    addUrlState((urlAccessor) => {
      return { tagId: parseInt(urlAccessor.queryParameter('tag_id')) }
    })
  }, [])

  useEffect(() => {
    dispatch(setCurrentTagId(tagId))
  }, [tagId])

  return null
}

export default UrlStore
