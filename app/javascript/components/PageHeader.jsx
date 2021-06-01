import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'

import { useUrlStore } from 'store/urlStore'

const PageHeader = () => {
  const dispatch = useDispatch()
  const [{}, { gotoBooks, openNewAuthorModal }] = useUrlStore()
  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }><b>Books</b></Nav.Link>
        <Nav.Link onClick={ () => openNewAuthorModal() }>+Author</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default PageHeader
