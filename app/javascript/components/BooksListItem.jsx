import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { selectBook, selectAuthor, selectSelectedBookId, setBookModalShown, setCurrentAuthor } from 'store/booksListSlice'
import BookModal from 'components/BookModal'

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
  const isSelected = useSelector(selectSelectedBookId) == id
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoViewIfNeeded()
    }
  })

  return (
    <div className={ classnames('book-case', { 'selected': isSelected }) } ref={ ref }>
      <div className='book-cover' style={ { backgroundImage: 'url(\'' + book.coverUrl + '\')' } }>
        <div className='book-actions'>
        <a href='/' onClick={ (e) => { e.preventDefault(); dispatch(setBookModalShown(true)) }}>Edit</a>
        <a href={ searchUrl(book, author) } target='_blank'>Search..</a>
        </div>
      </div>

      <div href='#' className='book-author' title={ author.fullname } onClick={ () => dispatch(setCurrentAuthor(author.id)) }>{ author.fullname }</div>

      <div className='book-title' title={ book.title }>
        { book.url
          ? <a href={ book.url }>{ book.title }</a>
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
