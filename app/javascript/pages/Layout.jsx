import React from 'react'
import { useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'

import { selectPageIsLoading } from 'store/metadata/selectors'

import BookNewModal from 'components/books/BookNewModal'
import BookEditModal from 'components/books/BookEditModal'
import AuthorNewModal from 'components/authors/AuthorNewModal'
import AuthorEditModal from 'components/authors/AuthorEditModal'

const Layout = (props) => {
  const { children, ...options } = props
  const pageIsLoading = useSelector(selectPageIsLoading())
  if (pageIsLoading) {
    return 'Wait...'
  }

  return (
    <Row { ...options }>
      { children }

      <AuthorNewModal/>
      <AuthorEditModal/>
      <BookNewModal/>
      <BookEditModal/>
    </Row>
  );
}

export default Layout
