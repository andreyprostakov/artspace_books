import React from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import { selectBatchModeOn } from 'store/selectables/selectors'

import PageConfigurer from 'pages/templates/booksListYearly/PageConfigurer'
import Layout from 'pages/Layout'
import BooksListYearly from 'widgets/booksListYearly/BooksListYearly'
import BooksYearlyControls from 'sidebar/batchControls/BooksYearlyControls'

const BooksPage = () => {
  const sidebarShown = useSelector(selectBatchModeOn())

  return (
    <>
      <PageConfigurer/>

      <Layout>
        { sidebarShown &&
          <Col xs={ 4 }>
            <div className='page-sidebar'>
              <BooksYearlyControls/>
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
