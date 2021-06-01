import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import BookModal from 'components/books/BookModal'
import ImageContainer from 'components/ImageContainer'
import EditIcon from 'components/icons/EditIcon'
import GoodreadsIcon from 'components/icons/GoodreadsIcon'
import GoogleIcon from 'components/icons/GoogleIcon'
import { selectBook, selectAuthor, selectSelectedBookId, selectBookDefaultImageUrl } from 'store/selectors'
import { setBookModalShown } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const BooksListItem = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const author = useSelector(selectAuthor(book.authorId))
  const ref = useRef(null)
  const currentBookId = useSelector(selectSelectedBookId())
  const isSelected = currentBookId == id
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  const [{}, { gotoAuthor }] = useUrlStore()

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoViewIfNeeded()
    }
  })

  return (
    <div className={ classnames('book-case', { 'selected': isSelected }) } ref={ ref }>
      <ImageContainer className='book-cover' url={ coverUrl }>
        <div className='book-actions'>
          { isSelected
            && <EditIcon onClick={ (e) => dispatch(setBookModalShown(true)) }/> }
          <GoodreadsIcon url={ book.goodreadsUrl }/>
          <GoogleIcon queryParts={ [author.fullname, book.title] }/>
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
