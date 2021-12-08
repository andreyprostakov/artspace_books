import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setupStoreForBooksPage } from 'pages/booksPage/actions'
import Layout from 'pages/Layout'
import BooksList from 'components/books/BooksList'
import usePageUrlStore from 'pages/booksPage/usePageUrlStore'

const BooksPage = () => {
  const dispatch = useDispatch()
  const [{ bookId }] = usePageUrlStore()

  useEffect(() => dispatch(setupStoreForBooksPage(bookId)), [])

  return (
    <Layout>
      <BooksList/>
    </Layout>
  )
}

export default BooksPage
