import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { selectBook, selectAuthor, selectSelectedBookId } from 'store/booksListSlice'

const searchUrl = (book, author) => {
  var params = new URLSearchParams()
  params.append('q', `goodreads ${author.fullname} ${book.title}`)
  return `http://google.com/search?${params.toString()}`
}

const booksListItem = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const author = useSelector(selectAuthor(book.authorId))
  const isSelected = useSelector(selectSelectedBookId) == id
  return (
    <div className={ classnames('book-case', { 'selected': isSelected }) }>
      <div className='book-cover' style={ { backgroundImage: 'url(\'' + book.coverUrl + '\')' } }>
        <div className='book-actions'>
        <a href='#'>Edit</a>
        <a href={ searchUrl(book, author) } target='_blank'>Search..</a>
        </div>
      </div>

      <div href='#' className='book-author' title={ author.fullname }>{ author.fullname }</div>

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
