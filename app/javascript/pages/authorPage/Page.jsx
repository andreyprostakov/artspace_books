import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'

import Layout from 'pages/Layout'
import AuthorCard from 'widgets/sidebar/authorCard/AuthorCard'
import BookCard from 'widgets/sidebar/bookCard/BookCard'
import BooksListLinearControls from 'widgets/sidebar/booksListLinearControls/BooksListLinearControls'
import BatchControls from 'widgets/sidebar/batchControls/BatchControls'
import BooksListLinear from 'widgets/booksListLinear/BooksListLinear'
import PageUrlStore from 'pages/authorPage/PageUrlStore'
import PageStoreConfigurer from 'pages/authorPage/PageStoreConfigurer'

const AuthorPage = () => {
  return (
    <>
      <PageUrlStore/>
      <PageStoreConfigurer/>

      <Layout>
        <Col xs={ 4 }>
          <div className='page-sidebar'>
            <AuthorCard/>
            <BooksListLinearControls/>
            <BatchControls/>
            <BookCard/>
          </div>
        </Col>

        <Col xs={ 8 }>
          <BooksListLinear/>
        </Col>
      </Layout>
    </>
  )
}

export default AuthorPage
