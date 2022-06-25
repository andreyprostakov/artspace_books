import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { HotKeys } from 'react-hotkeys'

import { selectAuthorFull } from 'store/authors/selectors'
import { selectCurrentBook } from 'store/books/selectors'
import { selectCurrentAuthorId, selectCurrentBookId } from 'store/axis/selectors'
import {
  jumpToFirstYear,
  jumpToLastYear,
  setBookShiftDirectionHorizontal,
  shiftSelection,
  shiftYear,
  toggleCurrentBookSelected,
} from 'widgets/booksListYearly/actions'
import { syncCurrentBookStats } from 'store/bookSync/actions'
import UrlStoreContext from 'store/urlStore/Context'

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
  SELECT_BOOK_FOR_BATCH: 'b',
}

const handleWheel = (dispatch, xDirection, yDirection) => {
  const speed = Math.abs(yDirection) / 150
  if (yDirection > 0) {
    dispatch(shiftYear(-speed))
  } else if (yDirection < 0) {
    dispatch(shiftYear(+speed))
  }
}

const HotKeysWrap = (props) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const currentAuthorId = useSelector(selectCurrentAuthorId())
  const currentAuthor = useSelector(selectAuthorFull(currentAuthorId))
  const currentBookId = useSelector(selectCurrentBookId())
  const currentBook = useSelector(selectCurrentBook())
  const { pageState: { modalBookEditShown },
          actions: { closeModal, openEditBookModal } } = useContext(UrlStoreContext)

  useEffect(() => ref.current.focus(), [])

  const hotKeysHandlers = () => ({
    DOWN: () => dispatch(shiftYear(-1)),
    PAGE_DOWN: () => dispatch(shiftYear(-2)),
    END: () => dispatch(jumpToFirstYear()),
    UP: () => dispatch(shiftYear(+1)),
    PAGE_UP: () => dispatch(shiftYear(+2)),
    START: () => dispatch(jumpToLastYear()),

    RIGHT: () => {
      dispatch(setBookShiftDirectionHorizontal('right'))
      dispatch(shiftSelection(+1))
    },
    LEFT: () => {
      dispatch(setBookShiftDirectionHorizontal('left'))
      dispatch(shiftSelection(-1))
    },
    SYNC_BOOK_STATS: () => dispatch(syncCurrentBookStats()),
    TOGGLE_AUTHOR: () => alert('TOGGLE'),
    TOGGLE_EDIT: () => {
      if (!currentBook) { return }

      if (modalBookEditShown) {
        closeModal()
      } else {
        openEditBookModal()
      }
    },
    SELECT_BOOK_FOR_BATCH: () => dispatch(toggleCurrentBookSelected())
  })

  return (
    <HotKeys keyMap={ keyMap } handlers={ hotKeysHandlers() }>
      <div tabIndex="-1" ref={ ref } onWheel={ (e) => handleWheel(dispatch, e.deltaX, e.deltaY) }>
        { props.children }
      </div>
    </HotKeys>
  )
}

export default HotKeysWrap
