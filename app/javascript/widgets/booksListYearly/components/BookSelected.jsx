import { sortBy } from 'lodash'
import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/PopularityBadge'
import BookToolbar from 'widgets/booksListYearly/components/BookToolbar'
import UrlStoreContext from 'store/urlStore/Context'
import { selectCurrentBookId } from 'store/axis/selectors'
import { selectAuthorRef } from 'store/authors/selectors'
import { selectBooksIndexEntry, selectBookDefaultImageUrl } from 'store/books/selectors'
import { selectTagsRefsByIds, selectVisibleTags } from 'store/tags/selectors'
import { setImageSrc } from 'modals/imageFullShow/actions'

const BookSelected = (props) => {
  const { id } = props
  const book = useSelector(selectBooksIndexEntry(id))
  const authorRef = useSelector(selectAuthorRef(book.authorId))
  const currentBookId = useSelector(selectCurrentBookId())
  const isSelected = currentBookId == id
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  const tags = useSelector(selectTagsRefsByIds(book.tagIds))
  const visibleTags = useSelector(selectVisibleTags(tags))
  const sortedTags = sortBy(visibleTags, tag => -tag.connectionsCount)
  const ref = useRef(null)
  const { routes: { authorPagePath } } = useContext(UrlStoreContext)

  useEffect(() => ref.current.focus(), [])

  return (
    <div className='book-case selected' ref={ ref }>
      <ImageContainer className='book-cover' url={ coverUrl } onClick={ () => dispatch(setImageSrc(book.coverFullUrl)) }/>

      <div className='book-details'>
        <a href={ authorPagePath(authorRef.id, { bookId: id }) } className='book-author' title={ authorRef.fullname }>
          { authorRef.fullname }
        </a>

        <div className='book-title' title={ book.title }>
          { book.goodreadsUrl
            ? <a href={ book.goodreadsUrl }>{ book.title }</a>
            : book.title
          }
        </div>

        <div className='book-tags'>
          { sortedTags.map(tag =>
            <TagBadge text={ tag.name } id={ tag.id } key={ tag.id } variant='dark'/>
          ) }
        </div>

        <div className='book-stats'>
          { Boolean(book.popularity) && book.globalRank &&
            <PopularityBadge rank={ book.globalRank } points={ book.popularity }/>
          }
        </div>

        <BookToolbar book={ book }/>
      </div>
    </div>
  );
}

export default BookSelected
