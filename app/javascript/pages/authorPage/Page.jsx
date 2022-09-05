import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'

import Layout from 'pages/Layout'
import SidebarAuthorCard from 'pages/authorPage/SidebarAuthorCard'
import BookCard from 'sidebar/bookCard/BookCard'
import BooksListLinearControls from 'sidebar/booksListLinearControls/BooksListLinearControls'
import BooksLinearControls from 'sidebar/batchControls/BooksLinearControls'
import BooksListLinear from 'widgets/booksListLinear/BooksListLinear'
import PageStoreConfigurer from 'pages/authorPage/PageStoreConfigurer'

const AuthorPage = () => {
  return (
    <>
      <PageStoreConfigurer/>

      <Layout>
        <Col xs={ 4 }>
          <div className='page-sidebar'>
            <SidebarAuthorCard/>
            <BooksListLinearControls/>
            <BooksLinearControls/>
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
