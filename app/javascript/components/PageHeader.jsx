import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'
import { selectCurrentAuthor, showFullList, shiftYear, showNewAuthorModal } from 'store/booksListSlice'

const PageHeader = () => {
  const author = useSelector(selectCurrentAuthor)
  const dispatch = useDispatch()
  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Navbar.Brand>Books</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => dispatch(showFullList) }>Home</Nav.Link>
        <Nav.Link onClick={ () => dispatch(showNewAuthorModal()) }>Add author</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default PageHeader
