import { compact, first, uniq } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { selectCurrentBookId } from 'store/axis/selectors'
import { pickNearEntries } from 'utils/pickNearEntries'
import { selectBookIdsByYear, selectCurrentBook, selectYearCurrentBookId } from 'widgets/booksList/selectors'

import Book from 'widgets/booksList/components/Book'
import BookSelected from 'widgets/booksList/components/BookSelected'

const YearRow = (props) => {
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
          ? <BookSelected id={ bookId } key={ bookId }/>
          : <Book id={ bookId } key={ bookId }/>
        ) }
      </div>
    </div>
  )
}

YearRow.propTypes = {
  year: PropTypes.number.isRequired,
}

export default YearRow
