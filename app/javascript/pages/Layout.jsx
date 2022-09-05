import React from 'react'
import { useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import classNames from 'classnames'

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

Layout.Sidebar = (props) => {
  const { children } = props
  return (
    <Col sm={4}>
      <div className='page-sidebar'>
        { children }
      </div>
    </Col>
  )
}

Layout.MainContent = (props) => {
  const { children, className } = props
  return (
    <Col sm={8}>
      <Row className={ classNames('layout-main-content-area', className) }>
        { children }
      </Row>
    </Col>
  )
}

export default Layout
