import React from 'react'
import { useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'

import { selectPageIsLoading } from 'store/metadata/selectors'

const Layout = (props) => {
  const { children, ...options } = props
  const pageIsLoading = useSelector(selectPageIsLoading())
  if (pageIsLoading) {
    return 'Wait...'
  }

  return (
    <Row { ...options }>
      { children }
    </Row>
  );
}

export default Layout
