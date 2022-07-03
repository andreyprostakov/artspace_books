import React from 'react'
import { useSelector } from 'react-redux'

import { selectBooksIndexEntry } from 'store/books/selectors'
import Book from 'widgets/booksListYearly/components/Book'
import BookPlaceholder from 'widgets/booksListYearly/components/BookPlaceholder'

const BookIndexEntry = (props) => {
  const { id, ...otherProps } = props
  const bookIndexEntry = useSelector(selectBooksIndexEntry(id))

  if (!bookIndexEntry) return <BookPlaceholder id={ id }/>

  return (
    <Book bookIndexEntry={ bookIndexEntry } { ...otherProps }/>
  )
}

export default BookIndexEntry
