import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import AuthorCard from 'components/authors/AuthorCard'
import BooksList from 'components/books/BooksList'
import { selectCurrentAuthorId } from 'store/selectors'

const AuthorBooksList = () => {
  const currentAuthorId = useSelector(selectCurrentAuthorId)
  if (!currentAuthorId) { return null }

  return (
    <>
      <Col xs={ 4 } lg={ 3 } className='author-card'>
        <AuthorCard/>
      </Col>
      <Col xs={ 8 } lg={ 9 }>
        <BooksList/>
      </Col>
    </>
  )
}

export default AuthorBooksList
