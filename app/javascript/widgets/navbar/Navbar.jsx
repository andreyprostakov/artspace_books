import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import AuthorsNavList from 'widgets/navbar/components/AuthorsNavList'
import TagsNavList from 'widgets/navbar/components/TagsNavList'
import { useUrlStore } from 'store/urlStore'
import { setAuthorsSearchKey, setTagsSearchKey } from 'widgets/navbar/actions'

const PageNavbar = () => {
  const [{},
         { gotoBooks, openNewAuthorModal },
         paths] = useUrlStore()
  const dispatch = useDispatch()

  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }><b>Books</b></Nav.Link>
        <NavDropdown title='Authors' onClick={ () => dispatch(setAuthorsSearchKey('')) }>
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

export default PageNavbar
