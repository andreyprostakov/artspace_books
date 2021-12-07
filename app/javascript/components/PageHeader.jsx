import React from 'react'
import { useSelector } from 'react-redux'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import AuthorsNavList from 'components/nav/AuthorsNavList'
import TagsNavList from 'components/nav/TagsNavList'
import { useUrlStore } from 'store/urlStore'

const PageHeader = () => {
  const [{},
         { gotoBooks, openNewAuthorModal },
         paths] = useUrlStore()
  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }><b>Books</b></Nav.Link>
        <NavDropdown title='Authors'>
          <AuthorsNavList/>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ paths.authorsPath() }>List all</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ paths.newAuthorModalPath() } onClick={ (e) => { e.preventDefault(); openNewAuthorModal() } }>
            +Author
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title='Tags'>
          <TagsNavList/>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ paths.tagsPath() }>List all</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}

export default PageHeader
