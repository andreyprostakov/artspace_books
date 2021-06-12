import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import { useUrlStore } from 'store/urlStore'

const PageHeader = () => {
  const dispatch = useDispatch()
  const [{}, { gotoAuthors, gotoBooks, gotoTags, openNewAuthorModal }] = useUrlStore()
  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }><b>Books</b></Nav.Link>
        <NavDropdown title='Authors'>
          <NavDropdown.Item onClick={ () => gotoAuthors() }>All</NavDropdown.Item>
          <NavDropdown.Item onClick={ () => openNewAuthorModal() }>+Author</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link onClick={ () => gotoTags() }><b>Tags</b></Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default PageHeader
