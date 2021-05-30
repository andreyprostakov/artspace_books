import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faDizzy, faBirthdayCake } from '@fortawesome/free-solid-svg-icons'

import { selectBookIdsByYear, selectYearsToDisplay, selectCurrentBook } from 'store/selectors'
import { fetchDisplayedBooks, setCurrentBookId } from 'store/actions'
import BooksListAuthorBirth from 'components/BooksListAuthorBirth'
import BooksListAuthorDeath from 'components/BooksListAuthorDeath'
import BooksListItem from 'components/BooksListItem'
import NavController from 'components/NavController'

const BooksList = () => {
  const dispatch = useDispatch()
  const years = useSelector(selectYearsToDisplay())
  const currentBook = useSelector(selectCurrentBook())

  useEffect(() => {
    dispatch(fetchDisplayedBooks())
  }, [currentBook?.year])

  return (
    <div className='books-list'>
      <BooksListAuthorDeath/>
      { years.map(year =>
        <BooksListYearRow year={ year } key={ year }/>
      ) }
      <BooksListAuthorBirth/>
    </div>
  )
}

const BooksListYearRow = (props) => {
  const bookIds = useSelector(selectBookIdsByYear(props.year))
  return (
    <div className='list-year row'>
      <div className='year-number col-1'>
        <div className='align-bottom'>
          { props.year }
          <div className='tick-sign'/>
        </div>
      </div>

      <div className='col-11'>
        <div className='year-books'>
          { bookIds.map(bookId =>
            <BooksListItem id={ bookId } key={ bookId }/>
          ) }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectYearsToDisplay: () => selectYearsToDisplay()(state)
  }
}

export default connect(mapStateToProps)(BooksList)
