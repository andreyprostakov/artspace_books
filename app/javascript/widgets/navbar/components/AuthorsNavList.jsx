import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormControl, NavDropdown } from 'react-bootstrap'

import { selectAuthorsRefs } from 'store/authors/selectors'
import { selectAuthorsSearchKey } from 'widgets/navbar/selectors'
import { setAuthorsSearchKey } from 'widgets/navbar/actions'
import useUrlStore from 'store/urlStore'
import { filterByString } from 'utils/filterByString'
import { sortByString } from 'utils/sortByString'

const AuthorsNavList = () => {
  const allAuthorsRefs = useSelector(selectAuthorsRefs())
  const query = useSelector(selectAuthorsSearchKey())
  const [{}, { gotoAuthorBooks }, paths] = useUrlStore()
  const dispatch = useDispatch()
  const searchRef = useRef()

  const displayedAuthorsRef = sortByString(
    filterByString(allAuthorsRefs, 'fullname', query),
    'fullname'
  )

  useEffect(() => searchRef.current.focus(), [query])

  return (
    <div className='authors-nav'>
      <div className='authors-nav-filter'>
        <Form.Control type='text' autoComplete='off' value={ query } onChange={ (e) => dispatch(setAuthorsSearchKey(e.target.value)) } ref={ searchRef }/>
      </div>
      <div className='authors-nav-list'>
        { displayedAuthorsRef.map(authorRef =>
          <NavDropdown.Item href={ paths.authorBooksPath(authorRef.id) } key={ authorRef.id } className='d-flex justify-content-between'>
            { authorRef.fullname }
            <span className='badge badge-primary badge-pill'>{ authorRef.booksCount }</span>
          </NavDropdown.Item>
        ) }
      </div>
    </div>
  )
}

export default AuthorsNavList
