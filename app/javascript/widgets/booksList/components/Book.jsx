import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { showBook } from 'widgets/booksList/actions'
import { selectBook } from 'widgets/booksList/selectors'
import { selectBookDefaultImageUrl } from 'store/metadata/selectors'

import ImageContainer from 'components/ImageContainer'

const Book = (props) => {
  const { id, ...options } = props
  const book = useSelector(selectBook(id))
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  return (
    <div className='book-case non-selected' onClick={ () => dispatch(showBook(id)) } title={ book.title } { ...options }>
      <ImageContainer className='book-cover' url={ coverUrl }/>
    </div>
  );
}

export default Book
