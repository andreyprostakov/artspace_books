import { sortBy, upperCase } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'

import Layout from 'pages/Layout'
import TagCard from 'pages/tagPage/TagCard'
import CurrentBookCard from 'pages/tagPage/CurrentBookCard'
import BooksListLinear from 'widgets/booksListLinear/BooksListLinear'
import BatchControls from 'widgets/booksList/components/BatchControls'

import { selectTag } from 'store/metadata/selectors'
import { setupStoreForTagPage } from 'pages/tagPage/actions'
import { selectNextBookId } from 'widgets/booksList/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import usePageUrlStore from 'pages/tagPage/usePageUrlStore'

const TagPage = () => {
  const dispatch = useDispatch()
  const [{ bookId, tagId }, { addBookWidget }] = usePageUrlStore()
  const nextBookId = useSelector(selectNextBookId())
  const tag = useSelector(selectTag(tagId))

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForTagPage(tagId)), [tagId])
  useEffect(() => nextBookId && addBookWidget(nextBookId), [nextBookId])

  if (!tag) { return null }

  return (
    <Layout className='tag-page'>
      <Col xs={ 4 }>
        <div className='page-sidebar'>
          <TagCard tag={ tag }/>
          <BatchControls/>
          <CurrentBookCard/>
        </div>
      </Col>
      <Col xs={ 8 }>
        <BooksListLinear/>
      </Col>
    </Layout>
  )
}

export default TagPage
