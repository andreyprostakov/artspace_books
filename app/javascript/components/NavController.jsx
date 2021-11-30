import React from 'react'
import { connect } from 'react-redux'
import { GlobalHotKeys } from 'react-hotkeys'

import {
  selectCurrentBook,
  selectCurrentAuthor,
} from 'store/selectors'
import {
  gotoFirstYear,
  gotoLastYear,
  shiftBookSelection,
  shiftYear,
  syncCurrentBookStats,
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
  RIGHT: 'Right',
  SYNC_BOOK_STATS: 's',
}

class NavController extends React.Component {
  handleToggleEdit() {
    const { urlStore, urlStoreActions, currentBook } = this.props
    if (!currentBook) { return }

    if (urlStore.editBookModalShown) {
      urlStoreActions.closeModal()
    } else {
      urlStoreActions.openEditBookModal()
    }
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

      BACK: () => urlStoreActions.closeModal(),
      TOGGLE_AUTHOR: () => this.handleToggleAuthor(),
      TOGGLE_EDIT: () => this.handleToggleEdit(),

      SYNC_BOOK_STATS: () => dispatch(syncCurrentBookStats()),
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
    currentAuthor: selectCurrentAuthor()(state)
  }
}

export default connectToUrlStore(connect(mapStateToProps)(NavController))
