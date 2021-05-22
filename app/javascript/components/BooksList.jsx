import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBookIdsByYear, selectCurrentYears, addBooks } from 'store/booksListSlice'
import BooksListItem from 'components/BooksListItem'
import NavController from 'components/NavController'
import booksLoader from 'serverApi/booksLoader'

const booksList = () => {
  const dispatch = useDispatch()
  const currentYears = useSelector(selectCurrentYears)
  const [loadStarted, setLoadStarted] = useState(false)

  if (!loadStarted) {
    setLoadStarted(true)
    booksLoader.initialLoad().then((books) => dispatch(addBooks(books)))
  }

  return (
    <div className='books-list'>
      <NavController/>
      { currentYears.reverse().map(year =>
        <BooksListYearRow year={ year } key={ year }/>
      ) }
    </div>
  )
}

const BooksListYearRow = (props) => {
  const bookIds = useSelector(selectBookIdsByYear(props.year))
  console.log(bookIds)
  return (
    <div className='list-year row'>
      <div className='year-number col-1'>
        <div className='align-bottom'>
          { props.year }
          <div className='tick-sign'/>
        </div>
      </div>
      <div className='year-books col-11'>
        { bookIds.map(bookId =>
          <BooksListItem id={ bookId } key={ bookId }/>
        ) }
      </div>
    </div>
  )
}

export default booksList
