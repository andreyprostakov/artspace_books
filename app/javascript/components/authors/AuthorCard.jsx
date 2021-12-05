import { isEmpty, sortBy } from 'lodash'
import React, { useEffect } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/small/PopularityBadge'
import CloseIcon from 'components/icons/CloseIcon'

import { selectCurrentAuthorDetails, selectTags } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'
import { setupStoreForAuthorCard } from 'store/authorsList/actions'

const AuthorCard = (props) => {
  const [{ authorId }, { openEditAuthorModal, openNewBookModal }] = useUrlStore()
  const { onClose } = props
  const dispatch = useDispatch()
  const authorDetails = useSelector(selectCurrentAuthorDetails())
  const tags = useSelector(selectTags(authorDetails.tagIds))
  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorCard(authorId))
  }, [authorId])
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
      <CloseIcon onClick={ () => onClose && onClose() }/>

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
          <span>Books: { authorDetails.booksCount }</span>
          <br/>
          <span>Popularity: <PopularityBadge rank={ authorDetails.rank } points={ authorDetails.popularity }/></span>
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
