import { isEmpty, sortBy } from 'lodash'
import React from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'

import { selectCurrentAuthorId, selectCurrentAuthor, selectCurrentAuthorDetails, selectTags } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'

const AuthorCard = () => {
  const dispatch = useDispatch()
  const author = useSelector(selectCurrentAuthor())
  const authorDetails = useSelector(selectCurrentAuthorDetails())
  const authorId = useSelector(selectCurrentAuthorId())
  const [{}, { openEditAuthorModal, openNewBookModal }] = useUrlStore()
  const tags = useSelector(selectTags(authorDetails.tagIds))
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

  const sortedTags = sortBy(tags, tag => tag.connectionsCount)

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
        <Card.Text className='author-card-text'>
          <span>{ renderLifetime() }</span>
          <br/>
          <span>Books: { author.booksCount }</span>
        </Card.Text>

        <div className='author-tags'>
          { sortedTags.map(tag =>
            <TagBadge text={ tag.name } id={ tag.id } key={ tag.id } variant='dark'/>
          ) }
        </div>

        <ButtonGroup>
          <Button variant='outline-warning' onClick={ () => openEditAuthorModal() }>Edit</Button>
          <Button variant='outline-info' onClick={ () => openNewBookModal() }>+ Book</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

export default AuthorCard
