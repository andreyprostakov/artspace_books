import React, { createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import AuthorForm from 'components/authors/AuthorForm'
import useUrlStore from 'store/urlStore'

const AuthorNewModal = () => {
  const [{ newAuthorModalShown }, { closeModal, gotoAuthorBooks }] = useUrlStore()
  const dispatch = useDispatch()

  const handleSuccess = (data) => {
    const { id: newAuthorId } = data
    closeModal()
    gotoAuthorBooks(newAuthorId)
  }

  return (
    <Modal show={ newAuthorModalShown } onHide={ () => closeModal() } size='lg' centered backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>New author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthorForm id='author_details_form' authorDetails={ { new: true } } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => closeModal()}>
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
