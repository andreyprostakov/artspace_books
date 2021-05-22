import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { selectBookById } from 'store/booksListSlice'

const searchUrl = (book) => {
  var params = new URLSearchParams()
  params.append('q', `goodreads ${book.author_id} ${book.title}`)
  return `http://google.com/search?${params.toString()}`
}

const booksListItem = (props) => {
  const { id } = props
  const book = useSelector(selectBookById(id))
  const isSelected = useSelector(state => state.booksList.selectedBookId == id)
  return (
    <div className={ classnames('book-case', { 'selected': isSelected }) }>
      <div className='book-cover' style={ { backgroundImage: 'url(\'' + book.cover_url + '\')' } }>
        <div className='book-actions'>
        <a href='#'>Edit</a>
        <a href={ searchUrl(book) } target='_blank'>Search..</a>
        </div>
      </div>

      <a href='#' className='book-author'>AUTHOR NAME</a>

      <div className='book-title'>
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
