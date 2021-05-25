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
      { author && <Col xs={ 4 } lg={ 3 }className='author-card'><AuthorCard/></Col> }
      { <Col xs={ author ? 8 : 12 } lg={ author ? 9 : 12 }><BooksList/></Col> }
    </Row>
  );
}

export default pageContent
