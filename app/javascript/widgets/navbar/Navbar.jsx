import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import AuthorsNavList from 'widgets/navbar/components/AuthorsNavList'
import TagsNavList from 'widgets/navbar/components/TagsNavList'
import { useUrlStore } from 'store/urlStore'
import { setAuthorsSearchKey, setTagsSearchKey } from 'widgets/navbar/actions'
import { selectTagIdBookmark, selectTagIdRead } from 'store/metadata/selectors'

const PageNavbar = () => {
  const [{},
         { gotoBooks, openNewAuthorModal },
         { authorsPath, booksPath, newAuthorModalPath, tagBooksPath, tagsPath }] = useUrlStore()
  const dispatch = useDispatch()
  const tagIdBookmark = useSelector(selectTagIdBookmark())
  const tagIdRead = useSelector(selectTagIdRead())

  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }><b>Infospace | Literature</b></Nav.Link>

        <NavDropdown title='Books'>
          <NavDropdown.Item href={ booksPath() }>List all</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ tagBooksPath(tagIdBookmark) }>Bookmarked by me</NavDropdown.Item>
          <NavDropdown.Item href={ tagBooksPath(tagIdRead) }>Read by me</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title='Authors' onClick={ () => dispatch(setAuthorsSearchKey('')) }>
          <AuthorsNavList/>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ authorsPath() }>List all</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ newAuthorModalPath() } onClick={ (e) => { e.preventDefault(); openNewAuthorModal() } }>
            +Author
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title='Tags'>
          <TagsNavList/>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ tagsPath() }>List all</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}

export default PageNavbar
