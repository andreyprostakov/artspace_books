import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'

import { setCurrentTagId } from 'store/axis/actions'
import { setPageIsLoading } from 'store/metadata/actions'
import UrlStoreContext from 'store/urlStore/Context'
import TagsPage from 'pages/tagsPage/Page'

const Helper = () => {
  const { actions: { addRoute }, helpers: { buildPath } } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('tagsPagePath', () => buildPath({ path: '/tags/' }))
  }, [])

  return null
}

const path = '/tags'

const Renderer = () => {
  return (
    <>
      <LocalStoreConfigurer/>
      <TagsPage/>
    </>
  )
}

const LocalStoreConfigurer = () => {
  const dispatch = useDispatch()
  const { pageState: { tagId },
          actions: { patch, addUrlAction, addUrlState },
          helpers: { buildRelativePath },
          getActions,
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addUrlAction('showTagIndexEntry', (id) =>
      getActions().patch(buildRelativePath({ params: { 'tag_id': id } }))
    )

    addUrlState('tagId', (url) => parseInt(url.queryParameter('tag_id')))
  }, [])

  useEffect(() => {
    dispatch(setCurrentTagId(tagId))
  }, [tagId])

  return null
}

export default { path, Renderer, Helper }
