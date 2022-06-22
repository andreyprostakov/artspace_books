import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useParams } from 'react-router-dom'

import { setCurrentAuthorId } from 'store/axis/actions'
import AuthorsPage from 'pages/authorsPage/Page'
import UrlStoreContext from 'store/urlStore/Context'

const Helper = () => {
  const { actions: { addRoute }, helpers: { buildPath } } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('authorsPagePath', (id) => buildPath({ path: '/authors' }))
  }, [])
  return null
}

const path = '/authors'

const Renderer = () => {
  return (
    <>
      <LocalStoreConfigurer/>
      <AuthorsPage/>
    </>
  )
}

const LocalStoreConfigurer = () => {
  const dispatch = useDispatch()

  const { actions: { addUrlAction, addUrlState, patch },
          helpers: { buildPath },
          pageState: { authorId },
        } = useContext(UrlStoreContext)

  useEffect(() => {
    addUrlState('authorId', url => parseInt(url.queryParameter('author_id')))

    addUrlState('sortOrder', url => url.queryParameter('sort_order'))

    addUrlAction('changeSortOrder', order => patch(buildPath({ params: { 'sort_order': order } })))

    addUrlAction('showAuthor', id => patch(buildPath({ params: { 'author_id': id } })))

    addUrlAction('removeAuthorWidget', () => patch(buildPath({ params: { 'author_id': null } })))

    dispatch(setCurrentAuthorId(authorId))
  }, [authorId])

  return null
}

export default { path, Renderer, Helper }
