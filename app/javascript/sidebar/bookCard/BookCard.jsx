import { sortBy } from 'lodash'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

import { selectAuthorRef } from 'store/authors/selectors'
import { selectCurrentBookIndexEntry, selectBookDefaultImageUrl } from 'store/books/selectors'
import { selectTagsRefsByIds, selectVisibleTags } from 'store/tags/selectors'
import { setImageSrc } from 'modals/imageFullShow/actions'
import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/PopularityBadge'
import BookToolbar from 'widgets/booksListYearly/components/BookToolbar'
import UrlStoreContext from 'store/urlStore/Context'

const BookCardWrap = () => {
  const booksIndexEntry = useSelector(selectCurrentBookIndexEntry())
  if (!booksIndexEntry) return null

  return (<BookCard booksIndexEntry={ booksIndexEntry }/>)
}

const BookCard = (props) => {
  const { booksIndexEntry } = props
  const dispatch = useDispatch()
  const authorRef = useSelector(selectAuthorRef(booksIndexEntry.authorId))
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const tags = useSelector(selectTagsRefsByIds(booksIndexEntry.tagIds))
  const visibleTags = useSelector(selectVisibleTags(tags))
  const { routes: { authorPagePath }, routesReady } = useContext(UrlStoreContext)

  const coverUrl = booksIndexEntry.coverUrl || defaultCoverUrl
  const sortedTags = sortBy(visibleTags, tag => -tag.connectionsCount)

  if (!routesReady || !booksIndexEntry) return null

  return (
    <Card className='sidebar-book-card-widget sidebar-card-widget'>
      <Card.Header className='widget-title'>Book</Card.Header>
      <Card.Body>
        <ImageContainer className='book-cover' url={ coverUrl } onClick={ () => dispatch(setImageSrc(booksIndexEntry.coverFullUrl)) }/>

        <div className='book-details'>
          <div>
            <a href={ authorPagePath(authorRef.id, { bookId: booksIndexEntry.id }) } className='book-author' title={ authorRef.fullname }>
              { authorRef.fullname }
            </a>
            ,&nbsp;
            <span className='year'>{ booksIndexEntry.year }</span>
          </div>

          <div className='book-title' title={ booksIndexEntry.title }>
            { booksIndexEntry.goodreadsUrl
              ? <a href={ booksIndexEntry.goodreadsUrl }>{ booksIndexEntry.title }</a>
              : booksIndexEntry.title
            }
          </div>

          <div className='book-stats'>
            { Boolean(booksIndexEntry.popularity) && booksIndexEntry.globalRank &&
              <PopularityBadge rank={ booksIndexEntry.globalRank } points={ booksIndexEntry.popularity }/>
            }
          </div>

          <BookToolbar book={ booksIndexEntry }/>
        </div>

        <div className='book-tags'>
          { sortedTags.map(tag =>
            <TagBadge text={ tag.name } id={ tag.id } key={ tag.id } variant='dark'/>
          ) }
        </div>
      </Card.Body>
    </Card>
  )
}

BookCard.propTypes = {
  booksIndexEntry: PropTypes.object.isRequired,
}

export default BookCardWrap
