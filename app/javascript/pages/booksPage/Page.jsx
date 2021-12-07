import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Layout from 'pages/Layout'
import BooksList from 'components/books/BooksList'
import { setupStoreForBooksPage } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const BooksPage = () => {
  const dispatch = useDispatch()
  const [{ bookId }] = useUrlStore()

  useEffect(() => dispatch(setupStoreForBooksPage(bookId)), [])

  return (
    <Layout>
      <BooksList/>
    </Layout>
  )
}

export default BooksPage
