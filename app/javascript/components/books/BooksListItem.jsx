import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { setNextBookId } from 'widgets/booksList/actions'
import ImageContainer from 'components/ImageContainer'
import { selectBook, selectBookDefaultImageUrl } from 'store/selectors'

const BooksListItem = (props) => {
  const { id } = props
  const book = useSelector(selectBook(id))
  const dispatch = useDispatch()
  const defaultCoverUrl = useSelector(selectBookDefaultImageUrl())
  const coverUrl = book.coverUrl || defaultCoverUrl
  return (
    <div className='book-case non-selected' onClick={ () => dispatch(setNextBookId(id)) } title={ book.title }>
      <ImageContainer className='book-cover' url={ coverUrl }>
      </ImageContainer>
    </div>
  );
}

BooksListItem.propTypes = {
  id: PropTypes.number.isRequired,
};

export default BooksListItem
