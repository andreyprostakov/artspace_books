import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { showBook } from 'widgets/booksList/actions'
import { selectBook, selectBookDefaultImageUrl } from 'widgets/booksList/selectors'

import ImageContainer from 'components/ImageContainer'

const Book = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  return (
    <div className='book-case non-selected' onClick={ () => dispatch(showBook(id)) } title={ book.title }>
      <ImageContainer className='book-cover' url={ coverUrl }/>
    </div>
  );
}

Book.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Book
