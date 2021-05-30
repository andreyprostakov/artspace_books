import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Button, Container, Row } from 'react-bootstrap'
import { GlobalHotKeys } from "react-hotkeys";

import {
  selectCurrentBook,
  selectBookModalShown,
  selectCurrentAuthor,
} from 'store/selectors'
import {
  gotoFirstYear,
  gotoLastYear,
  setBookModalShown,
  shiftBookSelection,
  shiftYear,
} from 'store/actions'
import { connectToUrlStore } from 'store/urlStore'

const keyMap = {
  DOWN: 'Down',
  PAGE_DOWN: 'PageDown',
  END: 'End',
  UP: 'Up',
  PAGE_UP: 'PageUp',
  START: 'Home',
  TOGGLE_EDIT: 'e',
  TOGGLE_AUTHOR: 'a',
  BACK: 'Backspace',
  LEFT: 'Left',
  RIGHT: 'Right'
}

class NavController extends React.Component {
  handleToggleEdit() {
    const { dispatch, bookModalShown } = this.props
    dispatch(setBookModalShown(!bookModalShown))
  }

  handleToggleAuthor() {
    const { currentAuthor, currentBook, urlStoreActions } = this.props

    if (currentAuthor) {
      urlStoreActions.gotoBooks()
    } else {
      urlStoreActions.gotoAuthor(currentBook.authorId)
    }
  }

  handlers() {
    const { dispatch, urlStoreActions } = this.props
    return {
      DOWN: () => this.props.dispatch(shiftYear(-1)),
      PAGE_DOWN: () => dispatch(shiftYear(-2)),
      END: () => dispatch(gotoFirstYear()),
      UP: () => dispatch(shiftYear(+1)),
      PAGE_UP: () => dispatch(shiftYear(+2)),
      START: () => dispatch(gotoLastYear()),

      RIGHT: () => dispatch(shiftBookSelection(+1)),
      LEFT: () => dispatch(shiftBookSelection(-1)),

      BACK: () => dispatch(urlStoreActions.gotoBooks()),
      TOGGLE_AUTHOR: () => this.handleToggleAuthor(),
      TOGGLE_EDIT: () => this.handleToggleEdit()
    }
  }

  render() {
    return (
      <GlobalHotKeys keyMap={ keyMap } handlers={ this.handlers() }>
        { this.props.children }
      </GlobalHotKeys>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentBook: selectCurrentBook()(state),
    currentAuthor: selectCurrentAuthor()(state),
    bookModalShown: selectBookModalShown()(state)
  }
}

export default connectToUrlStore(connect(mapStateToProps)(NavController))
