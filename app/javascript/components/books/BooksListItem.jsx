import { sortBy } from 'lodash'
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import ImageContainer from 'components/ImageContainer'
import EditIcon from 'components/icons/EditIcon'
import GoodreadsIcon from 'components/icons/GoodreadsIcon'
import GoogleIcon from 'components/icons/GoogleIcon'
import TagBadge from 'components/TagBadge'

import { selectBook, selectAuthor, selectCurrentBookId, selectBookDefaultImageUrl, selectTags } from 'store/selectors'
import { setBookModalShown } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const BooksListItem = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const author = useSelector(selectAuthor(book.authorId))
  const ref = useRef(null)
  const currentBookId = useSelector(selectCurrentBookId())
  const isSelected = currentBookId == id
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  const [{}, { gotoAuthor, openEditBookModal }] = useUrlStore()
  const tags = useSelector(selectTags(book.tagIds))
  const sortedTags = sortBy(tags, tag => -tag.connections_count)

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoViewIfNeeded()
    }
  })

  return (
    <div className={ classnames('book-case', { 'selected': isSelected }) } ref={ ref }>
      <ImageContainer className='book-cover' url={ coverUrl }>
        <div className='book-overlay'>
          <div className='book-actions'>
            { isSelected
              && <EditIcon onClick={ (e) => openEditBookModal() }/> }
            <GoodreadsIcon url={ book.goodreadsUrl }/>
            <GoogleIcon queryParts={ [author.fullname, book.title] }/>
          </div>
          <div className='book-tags'>
            { sortedTags.map(tag =>
              <TagBadge text={ tag.name } id={ tag.id } key={ tag.id }/>
            ) }
          </div>
        </div>
      </ImageContainer>

      <div href='#' className='book-author' title={ author.fullname } onClick={ () => gotoAuthor(author.id) }>{ author.fullname }</div>

      <div className='book-title' title={ book.title }>
        { book.goodreadsUrl
          ? <a href={ book.goodreadsUrl }>{ book.title }</a>
          : book.title
        }
      </div>
    </div>
  );
}

BooksListItem.propTypes = {
  id: PropTypes.number.isRequired
};

export default BooksListItem
