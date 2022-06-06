import { isEmpty, sortBy } from 'lodash'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Toolbar from 'widgets/sidebar/authorCard/Toolbar'
import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/PopularityBadge'
import CloseIcon from 'components/icons/CloseIcon'

import orders from 'pages/authorsPage/sortOrders'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import { selectCurrentAuthorDetails, selectTags, selectVisibleTags } from 'store/metadata/selectors'
import { setupStoreForAuthorCard } from 'widgets/sidebar/authorCard/actions'
import { setImageSrc } from 'widgets/imageModal/actions'
import { useUrlStore } from 'store/urlStore'

const AuthorCardWrap = () => {
  const authorId = useSelector(selectCurrentAuthorId())
  if (!authorId) { return null }
  return (<AuthorCard authorId={ authorId }/>)
}

const AuthorCard = (props) => {
  const { authorId } = props
  const [{}, {}, { authorsPath }] = useUrlStore()
  const { onClose } = props
  const dispatch = useDispatch()
  const authorDetails = useSelector(selectCurrentAuthorDetails())
  const tags = useSelector(selectTags(authorDetails.tagIds))
  const visibleTags = useSelector(selectVisibleTags(tags))
  const sortedTags = sortBy(visibleTags, tag => tag.connectionsCount)

  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorCard(authorId))
  }, [authorId])

  if (isEmpty(authorDetails) || (authorDetails.id && authorDetails.id !== authorId)) {
    return null
  }

  return (
    <Card className='sidebar-widget-author-card sidebar-card-widget'>
      <Card.Header className='widget-title'>Author</Card.Header>
      { onClose &&
        <CloseIcon onClick={ () => onClose() }/>
      }

      { authorDetails.imageUrl &&
        <ImageContainer className='author-image'
                        url={ authorDetails.imageCardUrl }
                        onClick={ () => dispatch(setImageSrc(authorDetails.imageUrl)) }/>
      }

      <Card.Body>
        <Card.Title>{ authorDetails.fullname }</Card.Title>
        <Card.Text className='author-card-text'>
          <span>Years: { renderLifetime(authorDetails, authorsPath) }</span>
          <br/>
          <span>Popularity: { authorDetails.popularity.toLocaleString() } pts (
            <a href={ authorsPath({ authorId: authorDetails.id, sortOrder: orders.BY_RANK_ASCENDING }) }>#{ authorDetails.rank }</a>
          )</span>
        </Card.Text>

        <div className='author-tags'>
          { sortedTags.map(tag =>
            <TagBadge text={ tag.name } id={ tag.id } key={ tag.id } variant='dark'/>
          ) }
        </div>

        <Toolbar author={ authorDetails }/>
      </Card.Body>
    </Card>
  )
}

AuthorCard.propTypes = {
  authorId: PropTypes.number.isRequired
}

const renderLifetime = (authorDetails, authorsPath) => {
  if (!authorDetails.birthYear) { return null }

  const birthLabel = `${authorDetails.birthYear}--`
  const age = authorDetails.deathYear
              ? authorDetails.deathYear - authorDetails.birthYear
              : new Date().getFullYear() - authorDetails.birthYear
  return(
    <>
      { birthLabel }
      { authorDetails.deathYear }
      &nbsp;(
        <a href={ authorsPath({ authorId: authorDetails.id, sortOrder: orders.BY_YEAR_ASCENDING }) }>
          age { age }
        </a>
      )
    </>
  )
}

export default AuthorCardWrap
