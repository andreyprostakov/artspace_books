import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentAuthor, initializeList } from 'store/booksListSlice'

const PageHeader = () => {
  const author = useSelector(selectCurrentAuthor)
  const dispatch = useDispatch()
  return (
    <h1 className='page-header'>
      <span onClick={ () => dispatch(initializeList) } className='root-link'>Books</span>
      { author
        && <span> | { author.fullname }</span>
      }
    </h1>
  )
}

export default PageHeader
