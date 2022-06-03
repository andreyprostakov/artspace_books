import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { showBook } from 'widgets/booksList/actions'
import { selectBook } from 'widgets/booksList/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'
import { selectBookDefaultImageUrl } from 'store/metadata/selectors'

import ImageContainer from 'components/ImageContainer'

const Book = (props) => {
  const { id, ...options } = props
  const dispatch = useDispatch()
  const book = useSelector(selectBook(id))
  const currentBookId = useSelector(selectCurrentBookId())
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())

  console.log([currentBookId, id, book])
  const isCurrent = id == currentBookId
  const coverUrl = book?.coverUrl || defaultCoverUrl
  const classNames = classnames('book-case', { 'non-selected': !isCurrent, 'selected': isCurrent })
  return (
    <div className={ classNames } onClick={ () => dispatch(showBook(id)) } title={ book.id } { ...options }>
      <ImageContainer className='book-cover' url={ coverUrl }/>
      <div className='year'>{ book.year }</div>
    </div>
  );
}

Book.propTypes = {
  id: PropTypes.number.isRequired,
}

export default Book
