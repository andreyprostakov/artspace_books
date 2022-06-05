import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col } from 'react-bootstrap'

import { setupStoreForBooksPage } from 'pages/booksPage/actions'
import { selectBatchModeOn } from 'widgets/booksList/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import Layout from 'pages/Layout'
import BooksList from 'widgets/booksList/BooksList'
import BatchControls from 'widgets/sidebar/batchControls/BatchControls'
import usePageUrlStore from 'pages/booksPage/usePageUrlStore'

const BooksPage = () => {
  const [{ bookId }, { addBookWidget }] = usePageUrlStore()
  const dispatch = useDispatch()
  const sidebarShown = useSelector(selectBatchModeOn())

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForBooksPage(bookId)), [])

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
