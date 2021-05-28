import { isEmpty } from 'lodash'
import React from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import ImageContainer from 'components/ImageContainer'
import {
  selectCurrentAuthorId,
  selectBooks,
  selectCurrentAuthorDetails
} from 'store/selectors'
import { setAuthorModalShown, loadCurrentAuthorDetails } from 'store/actions'

const AuthorCard = () => {
  const books = useSelector(selectBooks())
  const dispatch = useDispatch()
  const authorDetails = useSelector(selectCurrentAuthorDetails())
  const authorId = useSelector(selectCurrentAuthorId())
  if (isEmpty(authorDetails) || authorDetails.id !== authorId) {
    dispatch(loadCurrentAuthorDetails())
    return null
  }

  return (
    <Card className='author-card'>
      { authorDetails.imageUrl && <ImageContainer className='author-image' url={ authorDetails.imageUrl }/> }
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
