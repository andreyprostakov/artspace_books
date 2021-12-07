import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Layout from 'pages/Layout'
import AuthorBooksList from 'pages/authorPage/components/AuthorBooksList'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import { setupStoreForAuthorPage } from 'store/actions'
import { useUrlStore } from 'store/urlStore'
import usePageUrlStore from 'pages/authorPage/usePageUrlStore'

const AuthorPage = () => {
  const [{ authorId, bookId }] = usePageUrlStore()
  const dispatch = useDispatch()
  const currentAuthorId = useSelector(selectCurrentAuthorId())

  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorPage(authorId, bookId))
  }, [authorId])

  if (!currentAuthorId) { return null }

  return (
    <Layout>
      <AuthorBooksList/>
    </Layout>
  )
}

export default AuthorPage
