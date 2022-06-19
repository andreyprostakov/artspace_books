import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentTagId } from 'store/axis/actions'
import UrlStoreContext from 'store/urlStore/Context'
import { selectActions, selectPageState } from 'store/urlStore/selectors'
import { defineAction, definePageState, definePath } from 'store/urlStore/actions'

const UrlStore = () => {
  const dispatch = useDispatch()
  const { pageState,
          actions: { patch, addUrlAction, addUrlState },
          helpers: { buildPath },
        } = useContext(UrlStoreContext)
  const { tagId = null } = pageState

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
