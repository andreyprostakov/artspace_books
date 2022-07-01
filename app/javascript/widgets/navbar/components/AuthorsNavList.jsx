import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form, FormControl, NavDropdown, Spinner } from 'react-bootstrap'

import apiClient from 'store/authors/apiClient'
import EventsContext from 'store/events/Context'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorsNavList = () => {
  const { routes: { authorPagePath } } = useContext(UrlStoreContext)
  const { subscribeToEvent } = useContext(EventsContext)
  const [authorsSearchEntries, setAuthorsSearchEntries] = useState([])
  const [{ lastSearchedKey = null, searchInProgress = false }, setSearchState] = useState({})
  const searchKey = useRef(null)
  const searchRef = useRef()

  const setFocus = () => setTimeout(() => searchRef.current.focus(), 100)

  useEffect(() => {
    setFocus()
    subscribeToEvent('AUTHORS_NAV_CLICKED', () => setFocus())
  }, [])

  const searchAuthor = (key) => {
    searchKey.current = key
    setTimeout(() => {
      if (!Boolean(key) || key !== searchKey.current || key === lastSearchedKey || searchInProgress) return
      setSearchState({ searchInProgress: true })
      apiClient.search(key).then(searchEntries => {
        setSearchState({ searchInProgress: false, lastSearchedKey: key })
        setAuthorsSearchEntries(searchEntries)
      })
    }, 1000)
  }

  return (
    <div className='authors-nav'>
      <div className='authors-nav-search'>
        <Form.Control type='text' autoComplete='off' onChange={ (e) => searchAuthor(e.target.value) } ref={ searchRef }/>
        { searchInProgress &&
          <Spinner className='search-spinner' animation='border'/>
        }
      </div>
      <div className='authors-nav-list'>
        { authorsSearchEntries.map((searchEntry, i) =>
          <NavDropdown.Item href={ authorPagePath(searchEntry.authorId) } key={ i }
                            dangerouslySetInnerHTML={ { __html: searchEntry.label } } />
        ) }
      </div>
    </div>
  )
}

export default AuthorsNavList
