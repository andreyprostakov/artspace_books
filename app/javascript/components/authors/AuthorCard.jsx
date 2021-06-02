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
import { useUrlStore } from 'store/urlStore'

const AuthorCard = () => {
  const books = useSelector(selectBooks())
  const dispatch = useDispatch()
  const authorDetails = useSelector(selectCurrentAuthorDetails())
  const authorId = useSelector(selectCurrentAuthorId())
  const [{}, { openEditAuthorModal, openNewBookModal }] = useUrlStore()
  if (isEmpty(authorDetails) || (authorDetails.id && authorDetails.id !== authorId)) {
    return null
  }

  const renderLifetime = () => {
    if (!authorDetails.birthYear) { return null }

    const birthLabel = `${authorDetails.birthYear}--`
    const age = authorDetails.deathYear
                ? authorDetails.deathYear - authorDetails.birthYear
                : new Date().getFullYear() - authorDetails.birthYear
    const ageLabel = `(age ${age})`

    return [
      birthLabel,
      authorDetails.deathYear,
      ageLabel
    ].join('')
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
          <span>{ renderLifetime() }</span>
          <br/>
          <span>Books: { books.length }</span>
        </Card.Text>
        <ButtonGroup>
          <Button variant='outline-warning' onClick={ () => openEditAuthorModal() }>Edit</Button>
          <Button variant='outline-info' onClick={ () => openNewBookModal() }>+ Book</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

export default AuthorCard