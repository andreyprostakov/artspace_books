import React from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import { selectBatchModeOn } from 'widgets/booksList/selectors'

import ListUrlStore from 'widgets/booksList/components/UrlStore'
import PageStoreConfigurer from 'pages/booksPage/PageStoreConfigurer'
import Layout from 'pages/Layout'
import BooksList from 'widgets/booksList/BooksList'
import BatchControls from 'widgets/sidebar/batchControls/BatchControls'

const BooksPage = () => {
  const sidebarShown = useSelector(selectBatchModeOn())

  return (
    <>
      <ListUrlStore/>
      <PageStoreConfigurer/>

      <Layout>
        { sidebarShown &&
          <Col xs={ 4 }>
            <div className='page-sidebar'>
              <BatchControls/>
            </div>
          </Col>
        }
        <Col xs={ sidebarShown ? 8 : 12 }>
          <BooksList/>
        </Col>
      </Layout>
    </>
  )
}

export default BooksPage
