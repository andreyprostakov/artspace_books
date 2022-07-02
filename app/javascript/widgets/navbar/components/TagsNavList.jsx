import React, { useContext, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'

import apiClient from 'store/tags/apiClient'
import SearchForm from 'widgets/navbar/components/SearchForm'
import UrlStoreContext from 'store/urlStore/Context'

const TagsNavList = () => {
  const { routes: { tagPagePath } } = useContext(UrlStoreContext)
  const [searchEntries, setSearchEntries] = useState([])

  const apiSearcher = (key) => {
    return apiClient.search(key).then(searchEntries => {
      setSearchEntries(searchEntries)
    })
  }

  return (
    <div className='tags-nav'>
      <div className='nav-search-form'>
        <SearchForm focusEvent='TAGS_NAV_CLICKED' apiSearcher={ apiSearcher }/>
      </div>
      <div className='nav-search-list'>
        { searchEntries.map((searchEntry, i) =>
          <NavDropdown.Item href={ tagPagePath(searchEntry.tagId) } key={ i }>
            { searchEntry.highlight }
          </NavDropdown.Item>
        ) }
      </div>
    </div>
  )
}

export default TagsNavList
