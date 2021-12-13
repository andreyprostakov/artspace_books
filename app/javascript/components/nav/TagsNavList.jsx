import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FormControl, NavDropdown } from 'react-bootstrap'

import { selectAllTags } from 'store/metadata/selectors'
import { filterByString } from 'utils/filterByString'
import { sortByString } from 'utils/sortByString'
import { useUrlStore } from 'store/urlStore'

const TagsNavList = () => {
  const allTags = useSelector(selectAllTags())
  const [query, setQuery] = useState('')
  const [{}, { gotoTagBooks }, paths] = useUrlStore()

  const tags = sortByString(
    filterByString(allTags, 'name', query),
    'name'
  )

  return (
    <div className='tags-nav'>
      <div className='tags-nav-filter'>
        <FormControl type='text' autoComplete='off' onChange={ (e) => setQuery(e.target.value) }/>
      </div>
      <div className='tags-nav-list'>
        { tags.map(tag =>
          <NavDropdown.Item href={ paths.tagBooksPath(tag.id) } onClick={ (e) => { e.preventDefault(); gotoTagBooks(tag.id) } } key={ tag.id } className='d-flex justify-content-between'>
            { tag.name }
            <span className='badge badge-primary badge-pill'>{ tag.connectionsCount }</span>
          </NavDropdown.Item>
        ) }
      </div>
    </div>
  )
}

export default TagsNavList
