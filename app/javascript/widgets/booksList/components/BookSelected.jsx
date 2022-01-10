import { sortBy } from 'lodash'
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/PopularityBadge'
import BookToolbar from 'widgets/booksList/components/BookToolbar'

import { selectCurrentBookId } from 'store/axis/selectors'
import { selectAuthor, selectTags, selectVisibleTags } from 'store/metadata/selectors'
import {
  selectBook,
  selectBookDefaultImageUrl,
  selectNextBookId,
} from 'widgets/booksList/selectors'
import { setImageSrc } from 'widgets/imageModal/actions'
import { useUrlStore } from 'store/urlStore'

const BookSelected = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const author = useSelector(selectAuthor(book.authorId))
  const currentBookId = useSelector(selectCurrentBookId())
  const isSelected = currentBookId == id
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  const [{}, { gotoAuthorBooks }, { authorBooksPath }] = useUrlStore()
  const tags = useSelector(selectTags(book.tagIds))
  const visibleTags = useSelector(selectVisibleTags(tags))
  const sortedTags = sortBy(visibleTags, tag => -tag.connectionsCount)
  const ref = useRef(null)
  const nextBookId = useSelector(selectNextBookId())

  useEffect(() => ref.current.focus(), [nextBookId])

  return (
    <div className='book-case selected' ref={ ref }>
      <ImageContainer className='book-cover' url={ coverUrl } onClick={ () => dispatch(setImageSrc(book.coverFullUrl)) }/>

      <div className='book-details'>
        <a href={ authorBooksPath(author.id, { bookId: id }) } className='book-author' title={ author.fullname }
           onClick={ (e) => { e.preventDefault(); gotoAuthorBooks(author.id, { bookId: id }) } }>
          { author.fullname }
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
          { book.popularity && book.globalRank &&
            <PopularityBadge rank={ book.globalRank } points={ book.popularity }/>
          }
        </div>

        <BookToolbar book={ book }/>
      </div>
    </div>
  );
}

export default BookSelected
