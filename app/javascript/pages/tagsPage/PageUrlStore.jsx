import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setCurrentTagId } from 'store/axis/actions'
import UrlStoreContext from 'store/urlStore/Context'

const UrlStore = () => {
  const dispatch = useDispatch()
  const { pageState: { tagId = null },
          actions: { patch, addRoute, addUrlAction, addUrlState },
          routes: { tagSelectedPath },
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('tagSelectedPath', (id) => ({ params: { 'tag_id': id } }))

    addUrlAction('selectTag', (routes) => (id) => {
      console.log([routes, routes.tagSelectedPath, routes.tagSelectedPath(id)])
      patch(routes.tagSelectedPath(id))
    })

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
