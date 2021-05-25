import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import BooksList from 'components/BooksList'
import AuthorCard from 'components/AuthorCard'
import { selectCurrentAuthor } from 'store/booksListSlice'

const pageContent = () => {
  const author = useSelector(selectCurrentAuthor)
  return (
    <Row>
      { author && <Col xs={ 4 } className='author-card'><AuthorCard/></Col> }
      { <Col xs={ author ? 8 : 12 }><BooksList/></Col> }
    </Row>
  );
}

export default pageContent
