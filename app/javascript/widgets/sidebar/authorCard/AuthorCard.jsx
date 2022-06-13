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
import { selectAuthorFull, selectTags, selectVisibleTags } from 'store/metadata/selectors'
import { setupStoreForAuthorCard } from 'widgets/sidebar/authorCard/actions'
import { setImageSrc } from 'widgets/imageModal/actions'
import useUrlStore from 'store/urlStore'

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
  const authorFull = useSelector(selectAuthorFull(authorId))
  const tags = useSelector(selectTags(authorFull.tagIds))
  const visibleTags = useSelector(selectVisibleTags(tags))
  const sortedTags = sortBy(visibleTags, tag => tag.connectionsCount)

  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorCard(authorId))
  }, [authorId])

  if (isEmpty(authorFull)) return null

  return (
    <Card className='sidebar-widget-author-card sidebar-card-widget'>
      <Card.Header className='widget-title'>Author</Card.Header>
      { onClose &&
        <CloseIcon onClick={ () => onClose() }/>
      }

      <Card.Body>
        { authorFull.imageUrl &&
          <ImageContainer className='author-image' url={ authorFull.imageThumbUrl }
                          onClick={ () => dispatch(setImageSrc(authorFull.imageUrl)) }/>
        }

        <div className='details-right'>
          <div className='author-name'>{ authorFull.fullname }</div>

          <div className='author-card-text'>
            <div>Years: { renderLifetime(authorFull, authorsPath) }</div>
            <div>Popularity: { authorFull.popularity.toLocaleString() } pts (
              <a href={ authorsPath({ authorId: authorFull.id, sortOrder: orders.BY_RANK_ASCENDING }) }>
                #{ authorFull.rank }
              </a>
            )</div>
          </div>

          <div className='author-tags'>
            { sortedTags.map(tag =>
              <TagBadge text={ tag.name } id={ tag.id } key={ tag.id } variant='dark'/>
            ) }
          </div>
        </div>

        <Toolbar authorFull={ authorFull }/>
      </Card.Body>
    </Card>
  )
}

AuthorCard.propTypes = {
  authorId: PropTypes.number.isRequired
}

const renderLifetime = (authorFull, authorsPath) => {
  if (!authorFull.birthYear) { return null }

  const birthLabel = `${authorFull.birthYear}--`
  const age = authorFull.deathYear
              ? authorFull.deathYear - authorFull.birthYear
              : new Date().getFullYear() - authorFull.birthYear
  return(
    <>
      { birthLabel }
      { authorFull.deathYear }
      &nbsp;(
        <a href={ authorsPath({ authorId: authorFull.id, sortOrder: orders.BY_YEAR_ASCENDING }) }>
          age { age }
        </a>
      )
    </>
  )
}

export default AuthorCardWrap
