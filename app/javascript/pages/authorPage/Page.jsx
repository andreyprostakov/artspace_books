import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col } from 'react-bootstrap'

import { setupStoreForAuthorPage } from 'pages/authorPage/actions'
import { setCurrentBookId } from 'store/axis/actions'
import { selectCurrentBookId } from 'store/axis/selectors'
import usePageUrlStore from 'pages/authorPage/usePageUrlStore'

import Layout from 'pages/Layout'
import AuthorCard from 'widgets/sidebar/authorCard/AuthorCard'
import BatchControls from 'widgets/sidebar/batchControls/BatchControls'
import BooksList from 'widgets/booksList/BooksList'

const AuthorPage = () => {
  const [{ authorId, bookId }, { addBookWidget }] = usePageUrlStore()
  const currentBookId = useSelector(selectCurrentBookId())
  const dispatch = useDispatch()

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForAuthorPage(authorId, bookId)), [authorId])

  return (
    <Layout>
      <Col xs={ 4 }>
        <BatchControls/>
        <AuthorCard authorId={ authorId }/>
      </Col>
      <Col xs={ 8 }>
        <BooksList/>
      </Col>
    </Layout>
  )
}

export default AuthorPage
