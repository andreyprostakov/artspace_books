import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import BooksList from 'components/books/BooksList'
import { setupStoreForBooksPage } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const BooksPage = () => {
  const dispatch = useDispatch()
  const [{ bookId }] = useUrlStore()

  useEffect(() => dispatch(setupStoreForBooksPage(bookId)), [])

  return (
    <BooksList/>
  )
}

export default BooksPage
