import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import { selectCurrentAuthorId } from 'store/axis/selectors'
import AuthorCard from 'components/authors/AuthorCard'
import BooksList from 'components/books/BooksList'
import usePageUrlStore from 'pages/authorPage/usePageUrlStore'

const AuthorBooksList = () => {
  const [{ authorId }] = usePageUrlStore()

  return (
    <>
      <Col xs={ 4 } lg={ 4 } className='author-card'>
        <AuthorCard authorId={ authorId }/>
      </Col>
      <Col xs={ 8 } lg={ 8 }>
        <BooksList/>
      </Col>
    </>
  )
}

export default AuthorBooksList
