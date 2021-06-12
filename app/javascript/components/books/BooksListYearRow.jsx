import { compact, first, uniq } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'

import { selectBookIdsByYear, selectCurrentBookId, selectCurrentBook, selectYearCurrentBookId } from 'store/selectors'
import BooksListItem from 'components/books/BooksListItem'
import BooksListSelectedItem from 'components/books/BooksListSelectedItem'
import { pickNearEntries } from 'utils/pickNearEntries'

const BooksListYearRow = (props) => {
  const { year } = props
  const bookIds = useSelector(selectBookIdsByYear(year))
  const currentBookId = useSelector(selectCurrentBookId())
  const yearCurrentBookId = useSelector(selectYearCurrentBookId(year))
  const middleBookId = (bookIds.includes(currentBookId)) ? currentBookId : (yearCurrentBookId || first(bookIds))
  const displayedBookIds = pickNearEntries(bookIds, middleBookId, { lengthBefore: 3, lengthAfter: 3 })

  return (
    <div className='list-year'>
      <div className='year-number'>
        { year }
      </div>

      <div className='year-books'>
        { displayedBookIds.map(bookId =>
          (bookId == currentBookId)
          ? <BooksListSelectedItem id={ bookId } key={ bookId }/>
          : <BooksListItem id={ bookId } key={ bookId }/>
        ) }
      </div>
    </div>
  )
}

export default BooksListYearRow
