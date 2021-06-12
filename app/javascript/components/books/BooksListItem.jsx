import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import ImageContainer from 'components/ImageContainer'
import { setCurrentBookId } from 'store/actions'
import { selectBook, selectBookDefaultImageUrl } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'

const BooksListItem = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  return (
    <div className='book-case non-selected' onClick={ () => dispatch(setCurrentBookId(id)) } title={ book.title }>
      <ImageContainer className='book-cover' url={ coverUrl }>
      </ImageContainer>
    </div>
  );
}

BooksListItem.propTypes = {
  id: PropTypes.number.isRequired
};

export default BooksListItem
