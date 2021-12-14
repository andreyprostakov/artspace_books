import { sortBy } from 'lodash'
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Container, Row } from 'react-bootstrap'

import ImageContainer from 'components/ImageContainer'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/PopularityBadge'

import EditIcon from 'components/icons/EditIcon'
import GoodreadsIcon from 'components/icons/GoodreadsIcon'
import GoogleIcon from 'components/icons/GoogleIcon'
import RefreshIcon from 'components/icons/RefreshIcon'

import { selectCurrentBookId } from 'store/axis/selectors'
import { selectAuthor, selectTags } from 'store/metadata/selectors'
import {
  selectBook,
  selectBookDefaultImageUrl,
  selectNextBookId,
  selectSyncedBookId,
} from 'widgets/booksList/selectors'
import { syncBookStats } from 'widgets/booksList/actions'
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
  const [{}, { gotoAuthorBooks, openEditBookModal }, paths] = useUrlStore()
  const tags = useSelector(selectTags(book.tagIds))
  const sortedTags = sortBy(tags, tag => -tag.connectionsCount)
  const syncedBookId = useSelector(selectSyncedBookId())
  const ref = useRef(null)
  const nextBookId = useSelector(selectNextBookId())

  useEffect(() => ref.current.focus(), [nextBookId])

  return (
    <div className='book-case selected' ref={ ref }>
      <ImageContainer className='book-cover' url={ coverUrl }/>

      <div className='book-details'>
        <a href={ paths.authorBooksPath(author.id, { bookId: id }) } className='book-author' title={ author.fullname }
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

        <div className='book-actions'>
          <EditIcon onClick={ (e) => openEditBookModal() }/>
          <GoodreadsIcon url={ book.goodreadsUrl }/>
          { book.goodreadsUrl &&
            <RefreshIcon onClick={ (e) => dispatch(syncBookStats(book.id)) } className={ { disabled: !!syncedBookId } }/>
          }
          <GoogleIcon queryParts={ [author.fullname, book.title] }/>
        </div>
      </div>
    </div>
  );
}

BookSelected.propTypes = {
  id: PropTypes.number.isRequired
};

export default BookSelected
