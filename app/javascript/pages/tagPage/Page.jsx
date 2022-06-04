import { sortBy, upperCase } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import Layout from 'pages/Layout'
import TagCard from 'widgets/sidebar/tagCard/TagCard'
import BookCard from 'widgets/sidebar/bookCard/BookCard'
import BooksListLinearControls from 'widgets/sidebar/booksListLinearControls/BooksListLinearControls'
import BatchControls from 'widgets/sidebar/batchControls/BatchControls'
import BooksListLinear from 'widgets/booksListLinear/BooksListLinear'

import { selectTag } from 'store/metadata/selectors'
import { setupStoreForTagPage } from 'pages/tagPage/actions'
import { selectCurrentBook, selectNextBookId } from 'widgets/booksList/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import usePageUrlStore from 'pages/tagPage/usePageUrlStore'

const TagPage = () => {
  const dispatch = useDispatch()
  const [{ bookId, tagId }, { addBookWidget }] = usePageUrlStore()
  const nextBookId = useSelector(selectNextBookId())
  const tag = useSelector(selectTag(tagId))
  const currentBook = useSelector(selectCurrentBook())

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForTagPage(tagId, bookId)), [tagId])
  useEffect(() => nextBookId && addBookWidget(nextBookId), [nextBookId])

  if (!tag) { return null }

  return (
    <Layout className='tag-page'>
      <Col xs={ 4 }>
        <div className='page-sidebar'>
          <TagCard tag={ tag }/>
          <BooksListLinearControls/>
          <BatchControls/>
          { currentBook &&
            <BookCard book={ currentBook }/>
          }
        </div>
      </Col>
      <Col xs={ 8 }>
        <BooksListLinear/>
      </Col>
    </Layout>
  )
}

export default TagPage
