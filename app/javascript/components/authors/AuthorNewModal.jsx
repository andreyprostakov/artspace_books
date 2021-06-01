import React, { createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import AuthorForm from 'components/authors/AuthorForm'
import { useUrlStore } from 'store/urlStore'

const AuthorNewModal = () => {
  const [{ newAuthorModalShown }, { closeNewAuthorModal, gotoNewAuthor }] = useUrlStore()
  const dispatch = useDispatch()

  const handleClose = () => closeNewAuthorModal()

  const handleSuccess = (data) => {
    const { id: newAuthorId } = data
    handleClose()
    gotoNewAuthor(newAuthorId)
  }

  return (
    <Modal show={ newAuthorModalShown } onHide={ () => handleClose() } size='lg' centered backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>New author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthorForm id='author_details_form' authorDetails={ { new: true } } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => handleClose()}>
          Close
        </Button>
        <Button variant='primary' form='author_details_form' type='submit'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthorNewModal
