import { compact, first, uniq } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import PopularityChart from 'widgets/booksList/components/PopularityChart'

import { selectCurrentBookId } from 'store/axis/selectors'
import { pickNearEntries } from 'utils/pickNearEntries'
import {
  selectBookIdsByYear,
  selectBookShiftDirectionHorizontal,
  selectCurrentBook,
  selectYearCurrentBookId,
} from 'widgets/booksList/selectors'
import {
  setBookShiftDirectionHorizontal,
} from 'widgets/booksList/actions'

import Book from 'widgets/booksList/components/Book'
import BookSelected from 'widgets/booksList/components/BookSelected'

const YearRow = (props) => {
  const { year } = props
  const bookIds = useSelector(selectBookIdsByYear(year))
  const currentBook = useSelector(selectCurrentBook())
  const currentBookId = useSelector(selectCurrentBookId())
  const yearCurrentBookId = useSelector(selectYearCurrentBookId(year))
  const middleBookId = (bookIds.includes(currentBook.id)) ? currentBook.id : (yearCurrentBookId || first(bookIds))
  const displayedBookIds = pickNearEntries(bookIds, middleBookId, { lengthBefore: 3, lengthAfter: 3 })
  const yearIsCurrent = year === currentBook.year
  const direction = useSelector(selectBookShiftDirectionHorizontal())
  const dispatch = useDispatch()

  const classNames = classnames(
    'year-books',
    {
      'shifted-left': yearIsCurrent && direction === 'right',
      'shifted-right': yearIsCurrent && direction === 'left',
    }
  )

  const onAnimationEnd = (e) => {
    switch (e.animationName) {
      case 'move-left':
      case 'move-right': dispatch(setBookShiftDirectionHorizontal(null)); break;
    }
  }

  return (
    <div className='list-year'>
      { yearIsCurrent && displayedBookIds.length > 1 &&
        <PopularityChart displayedBookIds={ displayedBookIds } currentBookId={ currentBookId }/>
      }

      <div className='year-number'>
        { year }
      </div>

      <div className={ classNames } onAnimationEnd={ onAnimationEnd }>
        { displayedBookIds.map(bookId => {
          const bookKey = [bookId, direction].join()
          return bookId == currentBookId
            ? <BookSelected id={ bookId } key={ bookKey }/>
            : <Book id={ bookId } key={ bookKey }/>
        }) }
      </div>
    </div>
  )
}

YearRow.propTypes = {
  year: PropTypes.number.isRequired,
}

export default YearRow
