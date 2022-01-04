import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { HotKeys } from 'react-hotkeys'

import {
  selectCurrentAuthor,
} from 'store/metadata/selectors'
import { selectCurrentAuthorId, selectCurrentBookId } from 'store/axis/selectors'

import {
  selectCurrentBook,
  selectYearsToDisplay,
} from 'widgets/booksList/selectors'
import {
  fetchBooksForYears,
  jumpToFirstYear,
  jumpToLastYear,
  jumpToLatestYear,
  setSeed,
  shiftSelection,
  shiftYear,
  syncCurrentBookStats,
} from 'widgets/booksList/actions'

import usePageUrlStore from 'pages/booksPage/usePageUrlStore'
import AuthorBirthRow from 'widgets/booksList/components/AuthorBirthRow'
import AuthorDeathRow from 'widgets/booksList/components/AuthorDeathRow'
import YearRow from 'widgets/booksList/components/YearRow'
import YearsSlider from 'widgets/booksList/components/YearsSlider'

const BooksList = () => {
  const dispatch = useDispatch()
  const yearsToDisplay = useSelector(selectYearsToDisplay())
  const currentAuthorId = useSelector(selectCurrentAuthorId())
  const currentBookId = useSelector(selectCurrentBookId())
  const currentBook = useSelector(selectCurrentBook())
  const currentAuthor = useSelector(selectCurrentAuthor())
  const [{
           bookId: currentUrlBookId,
           editBookModalShown
         },
         {
           addBookWidget,
           closeModal,
           gotoAuthorBooks,
           gotoBooks,
           openEditBookModal,
         }] = usePageUrlStore()
  const ref = useRef(null)

  const [state, setState] = useState({})

  useEffect(() => {
    setState({ currentAuthorId, currentBookId, currentBook })
  }, [currentAuthorId, currentBookId, currentBook?.id])

  useEffect(() => ref.current.focus(), [])

  useEffect(() => !currentBookId && dispatch(jumpToLatestYear()), [currentBookId])

  useEffect(() => dispatch(fetchBooksForYears(yearsToDisplay)), [currentBook])

  useEffect(() => dispatch(setSeed()), [])

  const hotKeysHandlers = () => ({
    DOWN: () => dispatch(shiftYear(-1)),
    PAGE_DOWN: () => dispatch(shiftYear(-2)),
    END: () => dispatch(jumpToFirstYear()),
    UP: () => dispatch(shiftYear(+1)),
    PAGE_UP: () => dispatch(shiftYear(+2)),
    START: () => dispatch(jumpToLastYear()),

    RIGHT: () => dispatch(shiftSelection(+1)),
    LEFT: () => dispatch(shiftSelection(-1)),

    SYNC_BOOK_STATS: () => dispatch(syncCurrentBookStats()),
    TOGGLE_AUTHOR: () => {
      const { currentAuthorId, currentBookId, currentBook } = state
      console.log(`TOGGLE_AUTHOR get State: ${currentAuthorId}, ${currentBookId}`)
      console.log(`TOGGLE! AuthorID: ${currentAuthorId}, BookID: ${currentBookId}, Book: ${currentBook?.id}`)
      if (!currentBook) {
        return
      } else if (currentAuthorId) {
        gotoBooks({ bookId: currentBookId })
      } else {
        gotoAuthorBooks(currentBook.authorId, { bookId: currentBook.id })
      }
    },
    TOGGLE_EDIT: () => {
      if (!currentBook) { return }

      if (editBookModalShown) {
        closeModal()
      } else {
        openEditBookModal()
      }
    }
  })

  return (
    <HotKeys keyMap={ keyMap } handlers={ hotKeysHandlers() }>
      <div className='books-list'
        onWheel={ (e) => handleWheel(dispatch, e.deltaX, e.deltaY) }
        tabIndex="-1" ref={ ref }>

        <div className='books-list-shadow shadow-top'/>
        <div className='books-list-shadow shadow-bottom'/>
        <div className='books-list-shadow shadow-left'/>
        <div className='books-list-shadow shadow-right'/>

        <div className='side-scroll'>
          <YearsSlider/>
        </div>

        <div className='books-list-layer2'>
          <div className='books-list-layer3'>
            <AuthorDeathRow/>
            { yearsToDisplay.map(year =>
              <YearRow year={ year } key={ year }/>
            ) }
            <AuthorBirthRow/>
          </div>
        </div>
      </div>
    </HotKeys>
  )
}

const keyMap = {
  DOWN: 'Down',
  PAGE_DOWN: 'PageDown',
  END: 'End',
  UP: 'Up',
  PAGE_UP: 'PageUp',
  START: 'Home',
  TOGGLE_EDIT: 'e',
  TOGGLE_AUTHOR: 'a',
  LEFT: 'Left',
  RIGHT: 'Right',
  SYNC_BOOK_STATS: 's',
}

const handleWheel = (dispatch, xDirection, yDirection) => {
  const speed = Math.abs(yDirection) / 150
  if (yDirection > 0) {
    dispatch(shiftYear(-speed))
  } else if (yDirection < 0) {
    dispatch(shiftYear(+speed))
  }
}

export default BooksList
