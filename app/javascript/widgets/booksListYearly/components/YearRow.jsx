import { compact, first, uniq } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import { selectCurrentBookId } from 'store/axis/selectors'
import { selectBookPopularities, selectCurrentBookRef } from 'store/books/selectors'
import { pickNearEntries } from 'utils/pickNearEntries'
import {
  selectBookShiftDirectionHorizontal,
  selectDisplayedBookIdsInYear,
} from 'widgets/booksListYearly/selectors'
import {
  setBookShiftDirectionHorizontal,
} from 'widgets/booksListYearly/actions'

import PopularityChart from 'widgets/booksListYearly/components/PopularityChart'
import BookIndexEntry from 'widgets/booksListYearly/components/BookIndexEntry'

const YearRow = (props) => {
  const { year } = props
  const currentBookRef = useSelector(selectCurrentBookRef())
  const displayedBookIds = useSelector(selectDisplayedBookIdsInYear(year))
  const yearIsCurrent = year === currentBookRef.year
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
      { yearIsCurrent &&
        <PopularityChart bookIds={ displayedBookIds }/>
      }

      <div className='year-number'>
        { year }
      </div>

      <div className={ classNames } onAnimationEnd={ onAnimationEnd }>
        { displayedBookIds.map(bookId =>
          <BookIndexEntry id={ bookId } key={ [bookId, direction].join() }/>
        ) }
      </div>
    </div>
  )
}

YearRow.propTypes = {
  year: PropTypes.number.isRequired,
}

export default YearRow
