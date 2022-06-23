import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { selectBooksIndexEntry, selectBookDefaultImageUrl } from 'store/books/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'

import ImageContainer from 'components/ImageContainer'
import UrlStoreContext from 'store/urlStore/Context'

const Book = (props) => {
  const { id, showYear, ...options } = props
  const dispatch = useDispatch()
  const book = useSelector(selectBooksIndexEntry(id))
  const currentBookId = useSelector(selectCurrentBookId())
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const ref = useRef(null)
  const { actions: { showBooksIndexEntry } } = useContext(UrlStoreContext)

  const isCurrent = id == currentBookId
  const coverUrl = book?.coverUrl || defaultCoverUrl
  const classNames = classnames('book-case', { 'selected': isCurrent })

  useEffect(() => {
    if (isCurrent) { ref.current?.scrollIntoViewIfNeeded() }
  })

  if (!book) return null

  return (
    <div className={ classNames } onClick={ () => showBooksIndexEntry(id) } title={ book.title } ref={ ref } { ...options }>
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
