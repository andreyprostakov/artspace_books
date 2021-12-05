import { sortBy } from 'lodash'
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Container, Row } from 'react-bootstrap'

import ImageContainer from 'components/ImageContainer'
import EditIcon from 'components/icons/EditIcon'
import GoodreadsIcon from 'components/icons/GoodreadsIcon'
import GoogleIcon from 'components/icons/GoogleIcon'
import RefreshIcon from 'components/icons/RefreshIcon'
import TagBadge from 'components/TagBadge'
import PopularityBadge from 'components/small/PopularityBadge'

import {
  selectAuthor,
  selectBook,
  selectBookDefaultImageUrl,
  selectCurrentBookId,
  selectSyncedBookId,
  selectTags,
} from 'store/selectors'
import { setBookModalShown, syncBookStats } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const BooksListSelectedItem = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const author = useSelector(selectAuthor(book.authorId))
  const ref = useRef(null)
  const currentBookId = useSelector(selectCurrentBookId())
  const isSelected = currentBookId == id
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  const [{}, { gotoAuthorBooks, openEditBookModal }] = useUrlStore()
  const tags = useSelector(selectTags(book.tagIds))
  const sortedTags = sortBy(tags, tag => -tag.connectionsCount)
  const syncedBookId = useSelector(selectSyncedBookId())

  return (
    <div className='book-case selected' ref={ ref }>
      <ImageContainer className='book-cover' url={ coverUrl }/>

      <div className='book-details'>
        <div href='#' className='book-author' title={ author.fullname } onClick={ () => gotoAuthorBooks(author.id) }>{ author.fullname }</div>

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
          <PopularityBadge rank={ book.globalRank } points={ book.popularity }/>
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

BooksListSelectedItem.propTypes = {
  id: PropTypes.number.isRequired
};

export default BooksListSelectedItem
