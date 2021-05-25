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
    console.log('RELOADING')
    dispatch(reloadCurrentAuthorDetails)
    return null
  }
  console.log('NOT RELOADING')
  console.log(authorDetails)

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
          <p>{ [authorDetails.birthYear, authorDetails.deathYear].join('--') }</p>
          <p>Books: { books.length }</p>
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
