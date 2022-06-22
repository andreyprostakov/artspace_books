import React from 'react'
import { Col } from 'react-bootstrap'

import PageConfigurer from 'pages/templates/booksListYearly/PageConfigurer'
import Layout from 'pages/Layout'
import BooksListYearly from 'widgets/booksListYearly/BooksListYearly'
import BatchControls from 'sidebar/batchControls/BatchControls'

const Page = (props) => {
  const { config } = props
  return (
    <>
      <PageConfigurer listFilter={ config.booksListFilter }/>

      <Layout>
        <Col xs={ 4 }>
          <div className='page-sidebar'>
            { config.SidebarCardWidget &&
                <config.SidebarCardWidget/>
            }

            <BatchControls/>
          </div>
        </Col>
        <Col xs={ 8 }>
          <BooksListYearly/>
        </Col>
      </Layout>
    </>
  )
}

export default Page
