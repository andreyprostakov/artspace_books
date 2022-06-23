import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useParams } from 'react-router-dom'

import { setPageIsLoading } from 'store/metadata/actions'
import BooksPage from 'pages/booksPage/Page'
import UrlStoreContext from 'store/urlStore/Context'

const Helper = () => {
  const { actions: { addRoute }, helpers: { buildPath } } = useContext(UrlStoreContext)

  useEffect(() => {
    addRoute('booksPagePath', ({ bookId } = {}) => buildPath({ path: '/books', params: { 'book_id': bookId } }))
  }, [])
  return null
}

const path = '/books'

const Renderer = () => {
  return (
    <>
      <BooksPage/>
    </>
  )
}

export default { path, Renderer, Helper }
