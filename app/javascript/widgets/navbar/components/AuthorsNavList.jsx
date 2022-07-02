import React, { useContext, useState } from 'react'
import {  NavDropdown } from 'react-bootstrap'

import apiClient from 'store/authors/apiClient'
import SearchForm from 'widgets/navbar/components/SearchForm'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorsNavList = () => {
  const { routes: { authorPagePath } } = useContext(UrlStoreContext)
  const [authorsSearchEntries, setAuthorsSearchEntries] = useState([])

  const apiSearcher = (key) => {
    return apiClient.search(key).then(searchEntries => {
      setAuthorsSearchEntries(searchEntries)
    })
  }

  return (
    <div className='authors-nav'>
      <div className='nav-search-form'>
        <SearchForm focusEvent='AUTHORS_NAV_CLICKED' apiSearcher={ apiSearcher }/>
      </div>
      <div className='nav-search-list'>
        { authorsSearchEntries.map((searchEntry, i) =>
          <NavDropdown.Item href={ authorPagePath(searchEntry.authorId) } key={ i }
                            dangerouslySetInnerHTML={ { __html: searchEntry.highlight } } />
        ) }
      </div>
    </div>
  )
}

export default AuthorsNavList
