import React from 'react'
import { useSelector } from 'react-redux'

import { selectBookIdsByYear } from 'store/selectors'
import BooksListItem from 'components/books/BooksListItem'

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

export default BooksListYearRow
