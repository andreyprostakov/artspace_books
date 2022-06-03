import { compact, first, uniq } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import PopularityChart from 'widgets/booksList/components/PopularityChart'

import { selectCurrentBookId } from 'store/axis/selectors'
import { pickNearEntries } from 'utils/pickNearEntries'
import {
  selectBookShiftDirectionHorizontal,
  selectCurrentBook,
} from 'widgets/booksList/selectors'
import {
  setBookShiftDirectionHorizontal,
} from 'widgets/booksList/actions'

import Book from 'widgets/booksList/components/Book'
import BookSelected from 'widgets/booksList/components/BookSelected'
import BookEmptySpace from 'widgets/booksListLinear/components/BookEmptySpace'

const BooksRow = (props) => {
  const { ids: bookIds } = props
  const currentBook = useSelector(selectCurrentBook())
  const direction = useSelector(selectBookShiftDirectionHorizontal())
  const dispatch = useDispatch()

  if (!currentBook) { return null }

  const classNames = classnames(
    'year-books',
    {
      'shifted-left': direction === 'right',
      'shifted-right': direction === 'left',
    }
  )

  const onAnimationEnd = (e) => {
    switch (e.animationName) {
      case 'move-left':
      case 'move-right': dispatch(setBookShiftDirectionHorizontal(null)); break;
    }
  }

  console.log(bookIds)
  return (
    <div className='list-year'>
      { bookIds.length > 1 &&
        <PopularityChart displayedBookIds={ bookIds } currentBookId={ currentBook.id }/>
      }

      <div className={ classNames } onAnimationEnd={ onAnimationEnd }>
        { bookIds.map((bookId, i) => {
          switch (bookId) {
            case null: return <BookEmptySpace key={ i }/>; break;
            default: return <Book id={ bookId } key={ i }/>;
          }
        }) }
      </div>
    </div>
  )
}

BooksRow.propTypes = {
  ids: PropTypes.array.isRequired,
}

export default BooksRow
