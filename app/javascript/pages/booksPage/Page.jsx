import React from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import { selectBatchModeOn } from 'widgets/booksListYearly/selectors'

import ListUrlStore from 'widgets/booksListYearly/components/UrlStore'
import PageStoreConfigurer from 'pages/booksPage/PageStoreConfigurer'
import Layout from 'pages/Layout'
import BooksListYearly from 'widgets/booksListYearly/BooksListYearly'
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
          <BooksListYearly/>
        </Col>
      </Layout>
    </>
  )
}

export default BooksPage
