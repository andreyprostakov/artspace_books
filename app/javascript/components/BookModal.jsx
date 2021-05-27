import { isEmpty } from 'lodash'
import React, { createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import {
  selectBookModalShown,
  setBookModalShown,
  selectSelectedBookId,
  selectCurrentBookDetails,
  selectAuthor,
  loadCurrentBookDetails,
  reloadBook,
  shiftYear
} from 'store/booksListSlice'
import BookForm from 'components/BookForm'
import apiClient from 'serverApi/apiClient'

class BookModal extends React.Component {
  handleClose() {
    this.props.hideModal()
  }

  handleSuccess() {
    const { bookId, reloadBook, refreshList } = this.props
    reloadBook(bookId).then(() => refreshList())
    this.handleClose()
  }

  render() {
    const { show, bookId, bookDetails, loadDetails, selectAuthor } = this.props
    if (isEmpty(bookDetails) || bookDetails.id !== bookId) {
      loadDetails()
      return null
    }
    const author = selectAuthor(bookDetails.authorId)

    return (
      <Modal show={ show } onHide={() => this.handleClose()} size='lg' centered className='book-modal' backdropClassName='book-modal-backdrop'>
        <Modal.Header>
          <Modal.Title>
            Edit book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { bookDetails && <BookForm id='book_form' bookDetails={ bookDetails } onSubmit={ () => this.handleSuccess() }/> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => this.handleClose()}>
            Close
          </Button>
          <Button variant='primary' form='book_form' type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    show: selectBookModalShown(state),
    bookId: selectSelectedBookId(state),
    bookDetails: selectCurrentBookDetails(state),
    selectAuthor: (id) => selectAuthor(id)(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(setBookModalShown(false)),
    reloadBook: (id) => dispatch(reloadBook(id)),
    refreshList: () => dispatch(shiftYear(0)),
    loadDetails: () => dispatch(loadCurrentBookDetails)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookModal)
