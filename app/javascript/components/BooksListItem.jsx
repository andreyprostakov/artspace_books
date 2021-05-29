import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import BookModal from 'components/BookModal'
import ImageContainer from 'components/ImageContainer'
import EditIcon from 'components/icons/EditIcon'
import GoodreadsIcon from 'components/icons/GoodreadsIcon'
import GoogleIcon from 'components/icons/GoogleIcon'
import { selectBook, selectAuthor, selectSelectedBookId, selectBookDefaultImageUrl } from 'store/selectors'
import { setBookModalShown, setCurrentAuthor } from 'store/actions'

const searchUrl = (book, author) => {
  var params = new URLSearchParams()
  params.append('q', `goodreads ${author.fullname} ${book.title}`)
  return `http://google.com/search?${params.toString()}`
}

const booksListItem = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const author = useSelector(selectAuthor(book.authorId))
  const ref = useRef(null)
  const isSelected = useSelector(selectSelectedBookId()) == id
  const dispatch = useDispatch()
  const coverUrl = book.coverUrl || useSelector(selectBookDefaultImageUrl())

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

      <div href='#' className='book-author' title={ author.fullname } onClick={ () => dispatch(setCurrentAuthor(author.id)) }>{ author.fullname }</div>

      <div className='book-title' title={ book.title }>
        { book.goodreadsUrl
          ? <a href={ book.goodreadsUrl }>{ book.title }</a>
          : book.title
        }
      </div>
    </div>
  );
}

booksListItem.propTypes = {
  id: PropTypes.number.isRequired
};

export default booksListItem
