import React, { createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import {
  selectAuthorModalShown,
  setAuthorModalShown,
  selectCurrentAuthorId,
  setCurrentAuthorId,
  reloadBook,
  shiftYear,
  selectCurrentAuthorDetails,
  loadCurrentAuthorDetails,
  loadNewAuthor
} from 'store/booksListSlice'
import AuthorForm from 'components/AuthorForm'
import apiClient from 'serverApi/apiClient'

class AuthorModal extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClose() {
    this.props.hideModal()
  }

  handleSuccess(data) {
    const { authorId, loadNewAuthorDetails, reloadDetails } = this.props
    console.log([authorId, data.id])
    if (data.id && authorId != data.id) {
      loadNewAuthorDetails(data.id)
    } else {
      reloadDetails()
    }
    this.handleClose()
  }

  render() {
    const { show, authorId, authorDetails } = this.props
    return (
      <Modal show={ show } onHide={() => this.handleClose()} size='lg' centered backdropClassName='book-modal-backdrop'>
        <Modal.Header>
          <Modal.Title>Edit author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (authorDetails !== {}) && <AuthorForm id='author_details_form' authorDetails={ authorDetails } onSubmit={ (data) => this.handleSuccess(data) }/> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => this.handleClose()}>
            Close
          </Button>
          <Button variant='primary' form='author_details_form' type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    show: selectAuthorModalShown(state),
    authorId: selectCurrentAuthorId(state),
    authorDetails: selectCurrentAuthorDetails(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(setAuthorModalShown(false)),
    reloadDetails: () => dispatch(loadCurrentAuthorDetails),
    loadNewAuthorDetails: (id) => dispatch(loadNewAuthor(id)),
    setCurrentAuthorId: (id) => dispatch(setCurrentAuthorId(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorModal)
