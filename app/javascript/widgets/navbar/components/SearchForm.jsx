import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, FormControl, NavDropdown, Spinner } from 'react-bootstrap'

import { addErrorMessage } from 'widgets/notifications/actions'
import EventsContext from 'store/events/Context'

const SearchForm = (props) => {
  const { focusEvent = null, apiSearcher } = props
  const { subscribeToEvent } = useContext(EventsContext)
  const [{ lastSearchedKey = null, searchInProgress = false }, setSearchState] = useState({})
  const searchKey = useRef(null)
  const searchRef = useRef()
  const dispatch = useDispatch()

  const setFocus = () => setTimeout(() => searchRef.current.focus(), 100)

  useEffect(() => {
    setFocus()
    subscribeToEvent(focusEvent, () => {
      setFocus()
    })
  }, [])

  const performSearch = () => {
    const key = searchKey.current
    if (!Boolean(key) || searchInProgress) return

    setSearchState({ searchInProgress: true })
    apiSearcher(key).then(() => {
      setSearchState({ searchInProgress: false, lastSearchedKey: key })
    }).fail(() => {
      dispatch(addErrorMessage('Search failed!'))
      setSearchState({ searchInProgress: false })
    })
  }

  const handleSearchInput = (key) => {
    searchKey.current = key
    setTimeout(() => {
      if (key !== searchKey.current || key === lastSearchedKey) return
      performSearch()
    }, 1000)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    performSearch()
  }

  return (
    <Form onSubmit={ handleSearchSubmit }>
      <Form.Control type='text' autoComplete='off' onChange={ (e) => handleSearchInput(e.target.value) } ref={ searchRef }/>
      { searchInProgress &&
        <Spinner className='search-spinner' animation='border'/>
      }
    </Form>
  )
}

export default SearchForm
