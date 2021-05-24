import React, { createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { selectBookModalShown, setBookModalShown, selectSelectedBookId, reloadBook, shiftYear } from 'store/booksListSlice'
import BookForm from 'components/BookForm'
import apiClient from 'serverApi/apiClient'

class BookModal extends React.Component {
  constructor(props) {
    super(props)
    this.formRef = createRef()
    this.state = {
      details: null
    }
  }

  handleClose() {
    this.props.hideModal()
    this.setState({ details: null })
  }

  handleSuccess() {
    const { bookId, reloadBook, refreshList } = this.props
    reloadBook(bookId).then(() => refreshList())
    this.handleClose()
  }

  render() {
    const { details } = this.state
    const { show, bookId } = this.props
    if (show && !details) {
      apiClient.getBookDetails(bookId).then((details) => {
        this.setState({ details })
      })
    }

    return (
      <Modal show={ show } onHide={() => this.handleClose()} size='lg' centered backdropClassName='book-modal-backdrop'>
        <Modal.Header>
          <Modal.Title>Edit book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { details && <BookForm id='book_form' bookDetails={ details } onSubmit={ () => this.handleSuccess() } ref={ this.formRef }/> }
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
    bookId: selectSelectedBookId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(setBookModalShown(false)),
    reloadBook: (id) => dispatch(reloadBook(id)),
    refreshList: () => dispatch(shiftYear(0))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookModal)
