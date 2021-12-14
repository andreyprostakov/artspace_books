import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormControl, NavDropdown } from 'react-bootstrap'

import { selectAuthors } from 'store/metadata/selectors'
import { selectAuthorsSearchKey } from 'widgets/navbar/selectors'
import { setAuthorsSearchKey } from 'widgets/navbar/actions'
import { useUrlStore } from 'store/urlStore'
import { filterByString } from 'utils/filterByString'
import { sortByString } from 'utils/sortByString'

const AuthorsNavList = () => {
  const allAuthors = useSelector(selectAuthors())
  const query = useSelector(selectAuthorsSearchKey())
  const [{}, { gotoAuthorBooks }, paths] = useUrlStore()
  const dispatch = useDispatch()
  const searchRef = useRef()

  const authors = sortByString(
    filterByString(allAuthors, 'fullname', query),
    'fullname'
  )

  useEffect(() => searchRef.current.focus(), [query])

  return (
    <div className='authors-nav'>
      <div className='authors-nav-filter'>
        <Form.Control type='text' autoComplete='off' value={ query } onChange={ (e) => dispatch(setAuthorsSearchKey(e.target.value)) } ref={ searchRef }/>
      </div>
      <div className='authors-nav-list'>
        { authors.map(author =>
          <NavDropdown.Item href={ paths.authorBooksPath(author.id) } onClick={ (e) => { e.preventDefault(); gotoAuthorBooks(author.id) } } key={ author.id } className='d-flex justify-content-between'>
            { author.fullname }
            <span className='badge badge-primary badge-pill'>{ author.booksCount }</span>
          </NavDropdown.Item>
        ) }
      </div>
    </div>
  )
}

export default AuthorsNavList
