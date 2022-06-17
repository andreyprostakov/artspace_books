import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { selectBooksIndexEntry, selectBookDefaultImageUrl } from 'store/books/selectors'
import { showBook } from 'store/books/actions'
import { selectCurrentBookId } from 'store/axis/selectors'

import ImageContainer from 'components/ImageContainer'

const Book = (props) => {
  const { id, showYear, ...options } = props
  const dispatch = useDispatch()
  const book = useSelector(selectBooksIndexEntry(id))
  const currentBookId = useSelector(selectCurrentBookId())
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const ref = useRef(null)

  const isCurrent = id == currentBookId
  const coverUrl = book?.coverUrl || defaultCoverUrl
  const classNames = classnames('book-case', { 'selected': isCurrent })

  useEffect(() => {
    if (isCurrent) { ref.current?.scrollIntoViewIfNeeded() }
  })

  return (
    <div className={ classNames } onClick={ () => dispatch(showBook(id)) } title={ book.title } ref={ ref } { ...options }>
      <ImageContainer className='book-cover' url={ coverUrl }/>
      { showYear &&
        <div className='year'>{ book.year }</div>
      }
    </div>
  );
}

Book.propTypes = {
  id: PropTypes.number.isRequired,
  showYear: PropTypes.bool,
}

export default Book
