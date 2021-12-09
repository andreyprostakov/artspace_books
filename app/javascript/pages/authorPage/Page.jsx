import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setupStoreForAuthorPage } from 'pages/authorPage/actions'
import { selectNextBookId } from 'widgets/booksList/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import Layout from 'pages/Layout'
import AuthorBooksList from 'pages/authorPage/components/AuthorBooksList'
import usePageUrlStore from 'pages/authorPage/usePageUrlStore'

const AuthorPage = () => {
  const [{ authorId, bookId }, { addBookWidget }] = usePageUrlStore()
  const nextBookId = useSelector(selectNextBookId())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorPage(authorId, bookId))
  }, [authorId])

  if (!authorId) { return null }

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => nextBookId && addBookWidget(nextBookId), [nextBookId])

  return (
    <Layout>
      <AuthorBooksList/>
    </Layout>
  )
}

export default AuthorPage
