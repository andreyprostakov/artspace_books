import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'

import { selectAuthorRef } from 'store/authors/selectors'
import apiClient from 'store/books/apiClient'
import SearchForm from 'widgets/navbar/components/SearchForm'
import UrlStoreContext from 'store/urlStore/Context'

const BooksNavList = () => {
  const [searchEntries, setSearchEntries] = useState([])

  const apiSearcher = (key) => {
    return apiClient.search(key).then(searchEntries => {
      setSearchEntries(searchEntries)
    })
  }

  return (
    <div className='books-nav'>
      <div className='nav-search-form'>
        <SearchForm focusEvent='BOOKS_NAV_CLICKED' apiSearcher={ apiSearcher }/>
      </div>
      <div className='nav-search-list'>
        { searchEntries.map((searchEntry, i) =>
          <SearchEntry entry={ searchEntry } key={ i }/>
        ) }
      </div>
    </div>
  )
}

const SearchEntry = (props) => {
  const { entry } = props
  const authorRef = useSelector(selectAuthorRef(entry.authorId))
  const { routes: { booksPagePath } } = useContext(UrlStoreContext)
  return (
    <NavDropdown.Item href={ booksPagePath({ bookId: entry.bookId }) } title={ `${entry.title} (${entry.year})` }>
      <span className='author'>{ authorRef.fullname }</span>
      .&nbsp;
      <span className='title' dangerouslySetInnerHTML={ { __html: entry.highlight } }/>
      &nbsp;
      <span className='year'>({ entry.year })</span>
    </NavDropdown.Item>
  )
}

export default BooksNavList
