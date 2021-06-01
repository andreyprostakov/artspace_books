import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectYearsToDisplay, selectCurrentBook, selectCurrentBookId } from 'store/selectors'
import { fetchBooksForYears, setCurrentBookId } from 'store/actions'
import { useUrlStore } from 'store/urlStore'
import BooksListAuthorBirth from 'components/books/BooksListAuthorBirth'
import BooksListAuthorDeath from 'components/books/BooksListAuthorDeath'
import BooksListYearRow from 'components/books/BooksListYearRow'

const BooksList = () => {
  const dispatch = useDispatch()
  const yearsToDisplay = useSelector(selectYearsToDisplay())
  const currentBookId = useSelector(selectCurrentBookId())
  const currentBook = useSelector(selectCurrentBook())
  const [{ bookId: currentUrlBookId }, { gotoBook }] = useUrlStore()

  useEffect(() => {
    if (currentUrlBookId && currentUrlBookId !== currentBookId) {
      dispatch(setCurrentBookId(currentUrlBookId))
    }
  }, [currentUrlBookId])

  useEffect(() => {
    if (currentBookId && currentUrlBookId !== currentBookId) {
      gotoBook(currentBookId)
    }
  }, [currentBookId])

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
