import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormControl, NavDropdown } from 'react-bootstrap'

import { selectTagsRefs } from 'store/tags/selectors'
import { filterByString } from 'utils/filterByString'
import { sortByString } from 'utils/sortByString'
import UrlStoreContext from 'store/urlStore/Context'

const TagsNavList = () => {
  const allTags = useSelector(selectTagsRefs())
  const [query, setQuery] = useState('')
  const { routes: { tagPagePath } } = useContext(UrlStoreContext)

  const tags = sortByString(
    filterByString(allTags, 'name', query),
    'name'
  )

  return (
    <div className='tags-nav'>
      <div className='tags-nav-filter'>
        <FormControl type='text' autoComplete='off' onChange={ (e) => setQuery(e.target.value) } autoFocus/>
      </div>
      <div className='tags-nav-list'>
        { tags.map(tag =>
          <NavDropdown.Item href={ tagPagePath(tag.id) } key={ tag.id } className='d-flex justify-content-between'>
            { tag.name }
            <span className='badge badge-primary badge-pill'>{ tag.connectionsCount }</span>
          </NavDropdown.Item>
        ) }
      </div>
    </div>
  )
}

export default TagsNavList
