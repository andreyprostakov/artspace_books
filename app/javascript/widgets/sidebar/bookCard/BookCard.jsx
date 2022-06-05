import { sortBy } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

import { selectAuthor, selectCurrentBook, selectTags, selectVisibleTags, selectBookDefaultImageUrl } from 'store/metadata/selectors'
import { setImageSrc } from 'widgets/imageModal/actions'
import { useUrlStore } from 'store/urlStore'

import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/PopularityBadge'
import BookToolbar from 'widgets/booksListYearly/components/BookToolbar'

const BookCardWrap = () => {
  const book = useSelector(selectCurrentBook())
  if (!book) return null

  return (<BookCard book={ book }/>)
}

const BookCard = (props) => {
  const { book } = props
  const dispatch = useDispatch()
  const author = useSelector(selectAuthor(book.authorId))
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const tags = useSelector(selectTags(book.tagIds))
  const visibleTags = useSelector(selectVisibleTags(tags))
  const [{}, { gotoAuthorBooks }, { authorBooksPath }] = useUrlStore()

  const coverUrl = book.coverUrl || defaultCoverUrl
  const sortedTags = sortBy(visibleTags, tag => -tag.connectionsCount)

  if (!book) { return null }
  return (
    <Card id='book_card' className='sidebar-card-widget'>
      <Card.Header className='widget-title'>Book</Card.Header>
      <Card.Body>
        <ImageContainer className='book-cover' url={ coverUrl } onClick={ () => dispatch(setImageSrc(book.coverFullUrl)) }/>

        <div className='book-details'>
          <div>
            <a href={ authorBooksPath(author.id, { bookId: book.id }) } className='book-author' title={ author.fullname }
               onClick={ (e) => { e.preventDefault(); gotoAuthorBooks(author.id, { bookId: book.id }) } }>
              { author.fullname }
            </a>
            ,&nbsp;
            <span className='year'>{ book.year }</span>
          </div>

          <div className='book-title' title={ book.title }>
            { book.goodreadsUrl
              ? <a href={ book.goodreadsUrl }>{ book.title }</a>
              : book.title
            }
          </div>

          <div className='book-stats'>
            { book.popularity && book.globalRank &&
              <PopularityBadge rank={ book.globalRank } points={ book.popularity }/>
            }
          </div>

          <BookToolbar book={ book }/>
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
  book: PropTypes.object.isRequired,
}

export default BookCardWrap
