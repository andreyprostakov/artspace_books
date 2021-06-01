import { isEmpty } from 'lodash'
import React, { createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import {
  selectBookModalShown,
  selectCurrentBookId,
  selectCurrentBookDetails,
  selectAuthor,
} from 'store/selectors'
import {
  setBookModalShown,
  setCurrentBookDetails,
  loadCurrentBookDetails,
  reloadBook,
  shiftYear
} from 'store/actions'
import BookForm from 'components/books/BookForm'
import apiClient from 'serverApi/apiClient'

class BookModal extends React.Component {
  handleClose() {
    this.props.setCurrentBookDetails({})
    this.props.hideModal()
  }

  handleSuccess(data) {
    const { currentBookId, bookDetails, reloadBook, refreshList } = this.props
    reloadBook(bookDetails.new ? data.id : currentBookId).then(() => refreshList())
    this.handleClose()
  }

  render() {
    const { show, currentBookId, bookDetails, loadDetails, selectAuthor } = this.props
    if (show && (isEmpty(bookDetails) || (bookDetails.id && bookDetails.id !== currentBookId))) {
      loadDetails()
      return null
    }
    const author = selectAuthor(bookDetails.authorId)

    return (
      <Modal show={ show } onHide={() => this.handleClose()} size='lg' centered className='book-modal' backdropClassName='book-modal-backdrop'>
        <Modal.Header>
          <Modal.Title>
            { bookDetails.new ? 'New book' : 'Edit book' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { bookDetails && <BookForm id='book_form' bookDetails={ bookDetails } onSubmit={ (data) => this.handleSuccess(data) }/> }
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
    show: selectBookModalShown()(state),
    currentBookId: selectCurrentBookId()(state),
    bookDetails: selectCurrentBookDetails()(state),
    selectAuthor: (id) => selectAuthor(id)(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(setBookModalShown(false)),
    reloadBook: (id) => dispatch(reloadBook(id)),
    refreshList: () => dispatch(shiftYear(0)),
    loadDetails: () => dispatch(loadCurrentBookDetails()),
    setCurrentBookDetails: (details) => dispatch(setCurrentBookDetails(details)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookModal)
