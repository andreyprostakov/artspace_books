import React from 'react'
import { Row } from 'react-bootstrap'

import BookNewModal from 'components/books/BookNewModal'
import BookEditModal from 'components/books/BookEditModal'
import AuthorNewModal from 'components/authors/AuthorNewModal'
import AuthorEditModal from 'components/authors/AuthorEditModal'

const Layout = (props) => {
  const { children, ...options } = props
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
