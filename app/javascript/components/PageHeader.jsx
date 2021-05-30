import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'

import { selectCurrentAuthor } from 'store/selectors'
import { shiftYear, showNewAuthorModal } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const PageHeader = () => {
  const author = useSelector(selectCurrentAuthor())
  const dispatch = useDispatch()
  const [{}, { gotoBooks, openNewAuthorModal }] = useUrlStore()
  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Navbar.Brand>Books</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }>Home</Nav.Link>
        <Nav.Link onClick={ () => openNewAuthorModal() }>Add author</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default PageHeader
