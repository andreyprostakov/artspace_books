import React from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import { selectBatchModeOn } from 'widgets/booksListYearly/selectors'

import PageConfigurer from 'pages/templates/booksListYearly/PageConfigurer'
import Layout from 'pages/Layout'
import BooksListYearly from 'widgets/booksListYearly/BooksListYearly'
import BatchControls from 'sidebar/batchControls/BatchControls'

const BooksPage = () => {
  const sidebarShown = useSelector(selectBatchModeOn())

  return (
    <>
      <PageConfigurer/>

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
