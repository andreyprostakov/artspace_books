import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { selectBooksIndexEntry, selectBookDefaultImageUrl } from 'store/books/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'
import { selectBookIsSelected } from 'widgets/booksListYearly/selectors'
import { toggleId } from 'store/selectables/actions'

import ImageContainer from 'components/ImageContainer'
import UrlStoreContext from 'store/urlStore/Context'

const Book = (props) => {
  const { id, showYear, ...options } = props
  const dispatch = useDispatch()
  const book = useSelector(selectBooksIndexEntry(id))
  const currentBookId = useSelector(selectCurrentBookId())
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const ref = useRef(null)
  const isSelectedForBatch = useSelector(selectBookIsSelected(id))
  const { actions: { showBooksIndexEntry } } = useContext(UrlStoreContext)

  const isCurrent = id == currentBookId
  const coverUrl = book?.coverUrl || defaultCoverUrl
  const classNames = classnames('book-case', { 'selected': isCurrent, 'selected-for-batch': isSelectedForBatch })

  useEffect(() => {
    if (isCurrent) { ref.current?.scrollIntoViewIfNeeded() }
  })

  const handleClick = (e) => {
    if (e.ctrlKey) dispatch(toggleId(id))
    showBooksIndexEntry(id)
  }

  if (!book) return null

  return (
    <div className={ classNames } onClick={ handleClick } title={ book.title } ref={ ref } { ...options }>
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
