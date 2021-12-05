import React from 'react'
import { useSelector } from 'react-redux'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import AuthorsNavList from 'components/nav/AuthorsNavList'
import TagsNavList from 'components/nav/TagsNavList'
import { useUrlStore } from 'store/urlStore'

const PageHeader = () => {
  const [{},
         { gotoBooks, gotoAuthorsList, openNewAuthorModal }] = useUrlStore()
  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }><b>Books</b></Nav.Link>
        <NavDropdown title='Authors'>
          <AuthorsNavList/>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={ () => gotoAuthorsList() }>List all</NavDropdown.Item>
          <NavDropdown.Item onClick={ () => openNewAuthorModal() }>+Author</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title='Tags'>
          <TagsNavList/>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}

export default PageHeader
