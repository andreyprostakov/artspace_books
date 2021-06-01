import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectYearsToDisplay, selectCurrentBook } from 'store/selectors'
import { fetchBooksForYears } from 'store/actions'
import BooksListAuthorBirth from 'components/books/BooksListAuthorBirth'
import BooksListAuthorDeath from 'components/books/BooksListAuthorDeath'
import BooksListYearRow from 'components/books/BooksListYearRow'

const BooksList = () => {
  const dispatch = useDispatch()
  const yearsToDisplay = useSelector(selectYearsToDisplay())
  const currentBook = useSelector(selectCurrentBook())

  useEffect(() => {
    dispatch(fetchBooksForYears(yearsToDisplay))
  }, [currentBook?.year])

  return (
    <div className='books-list'>
      <BooksListAuthorDeath/>
      { yearsToDisplay.map(year =>
        <BooksListYearRow year={ year } key={ year }/>
      ) }
      <BooksListAuthorBirth/>
    </div>
  )
}

export default BooksList
