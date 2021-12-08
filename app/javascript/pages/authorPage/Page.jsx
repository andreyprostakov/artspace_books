import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setupStoreForAuthorPage } from 'pages/authorPage/actions'
import Layout from 'pages/Layout'
import AuthorBooksList from 'pages/authorPage/components/AuthorBooksList'
import usePageUrlStore from 'pages/authorPage/usePageUrlStore'

const AuthorPage = () => {
  const [{ authorId, bookId }] = usePageUrlStore()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorPage(authorId, bookId))
  }, [authorId])

  if (!authorId) { return null }

  return (
    <Layout>
      <AuthorBooksList/>
    </Layout>
  )
}

export default AuthorPage
