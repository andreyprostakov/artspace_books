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
  }, [currentBook])

  return (
    <div className='books-list'>
      <div className='books-list-shadow shadow-top'/>
      <div className='books-list-shadow shadow-bottom'/>
      <div className='books-list-shadow shadow-left'/>
      <div className='books-list-shadow shadow-right'/>
      <div className='books-list-layer2'>
        <div className='books-list-layer3'>
          <BooksListAuthorDeath/>
          { yearsToDisplay.map(year =>
            <BooksListYearRow year={ year } key={ year }/>
          ) }
          <BooksListAuthorBirth/>
        </div>
      </div>
    </div>
  )
}

export default BooksList
