import { isEmpty } from 'lodash'
import React from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { selectCurrentAuthor, selectBooks, setAuthorModalShown, selectCurrentAuthorDetails, reloadCurrentAuthorDetails } from 'store/booksListSlice'

const AuthorCard = () => {
  const author = useSelector(selectCurrentAuthor)
  const books = useSelector(selectBooks)
  const dispatch = useDispatch()
  const authorDetails = useSelector(selectCurrentAuthorDetails)
  if (isEmpty(authorDetails)) {
    dispatch(reloadCurrentAuthorDetails)
    return null
  }

  return (
    <Card>
      <Card.Img variant='top' src={ authorDetails.imageUrl }/>
      <Card.Body>
        <Card.Title>
          { authorDetails.wikiUrl
            ? <a href={ authorDetails.wikiUrl } target='_blank'>{ authorDetails.fullname }</a>
            : authorDetails.fullname
          }
        </Card.Title>
        <Card.Text>
          <span>{ [authorDetails.birthYear, authorDetails.deathYear].join('--') }</span>
          <br/>
          <span>Books: { books.length }</span>
        </Card.Text>
        <ButtonGroup>
          <Button variant='outline-warning' onClick={ () => dispatch(setAuthorModalShown(true)) }>Edit</Button>
          <Button variant='outline-info'>+ Book</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

export default AuthorCard
