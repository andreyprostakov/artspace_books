import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FormControl, NavDropdown } from 'react-bootstrap'

import { selectAuthors } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'
import { filterByString } from 'utils/filterByString'
import { sortByString } from 'utils/sortByString'

const AuthorsNavList = () => {
  const allAuthors = useSelector(selectAuthors())
  const [query, setQuery] = useState('')
  const [{}, { gotoAuthorBooks }] = useUrlStore()

  const authors = sortByString(
    filterByString(allAuthors, 'fullname', query),
    'fullname'
  )

  return (
    <div className='authors-nav'>
      <div className='authors-nav-filter'>
        <FormControl type='text' autoComplete='off' onChange={ (e) => setQuery(e.target.value) }/>
      </div>
      <div className='authors-nav-list'>
        { authors.map(author =>
          <NavDropdown.Item onClick={ () => gotoAuthorBooks(author.id) } key={ author.id } className='d-flex justify-content-between'>
            { author.fullname }
            <span className='badge badge-primary badge-pill'>{ author.booksCount }</span>
          </NavDropdown.Item>
        ) }
      </div>
    </div>
  )
}

export default AuthorsNavList
