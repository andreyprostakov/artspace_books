import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import Layout from 'pages/Layout'
import TagCard from 'widgets/sidebar/tagCard/TagCard'
import BookCard from 'widgets/sidebar/bookCard/BookCard'
import BooksListLinearControls from 'widgets/sidebar/booksListLinearControls/BooksListLinearControls'
import BatchControls from 'widgets/sidebar/batchControls/BatchControls'
import BooksListLinear from 'widgets/booksListLinear/BooksListLinear'
import PageUrlStore from 'pages/tagPage/PageUrlStore'
import PageStoreConfigurer from 'pages/tagPage/PageStoreConfigurer'

const TagPage = () => {
  const dispatch = useDispatch()
  return (
    <>
      <PageUrlStore/>
      <PageStoreConfigurer/>

      <Layout className='tag-page'>
        <Col xs={ 4 }>
          <div className='page-sidebar'>
            <TagCard/>
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

export default TagPage
