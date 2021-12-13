import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setupStoreForBooksPage } from 'pages/booksPage/actions'
import { selectNextBookId } from 'widgets/booksList/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import Layout from 'pages/Layout'
import BooksList from 'widgets/booksList/BooksList'
import usePageUrlStore from 'pages/booksPage/usePageUrlStore'

const BooksPage = () => {
  const [{ bookId }, { addBookWidget }] = usePageUrlStore()
  const nextBookId = useSelector(selectNextBookId())
  const dispatch = useDispatch()

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForBooksPage(bookId)), [])
  useEffect(() => nextBookId && addBookWidget(nextBookId), [nextBookId])

  return (
    <Layout>
      <BooksList/>
    </Layout>
  )
}

export default BooksPage
