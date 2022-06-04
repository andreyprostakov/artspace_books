import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col } from 'react-bootstrap'

import { setupStoreForBooksPage } from 'pages/booksPage/actions'
import { selectBatchModeOn, selectNextBookId } from 'widgets/booksList/selectors'
import { setCurrentBookId } from 'widgets/booksList/actions'
import Layout from 'pages/Layout'
import BooksList from 'widgets/booksList/BooksList'
import BatchControls from 'widgets/sidebar/batchControls/BatchControls'
import usePageUrlStore from 'pages/booksPage/usePageUrlStore'

const BooksPage = () => {
  const [{ bookId }, { addBookWidget }] = usePageUrlStore()
  const nextBookId = useSelector(selectNextBookId())
  const dispatch = useDispatch()
  const sidebarShown = useSelector(selectBatchModeOn())

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForBooksPage(bookId)), [])
  useEffect(() => nextBookId && addBookWidget(nextBookId), [nextBookId])

  return (
    <Layout>
      { sidebarShown &&
        <Col xs={ 4 }>
          <BatchControls/>
        </Col>
      }
      <Col xs={ sidebarShown ? 8 : 12 }>
        <BooksList/>
      </Col>
    </Layout>
  )
}

export default BooksPage
