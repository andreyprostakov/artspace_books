import { isEmpty } from 'lodash'
import React, { createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { selectCurrentAuthorId, selectCurrentAuthorDetails } from 'store/selectors'
import { loadAuthorDetails, loadAuthor } from 'store/actions'
import AuthorForm from 'components/authors/AuthorForm'
import { useUrlStore } from 'store/urlStore'

const AuthorEditModal = () => {
  const [{ editAuthorModalShown }, { closeEditAuthorModal }] = useUrlStore()
  const currentAuthorId = useSelector(selectCurrentAuthorId())
  const authorDetails = useSelector(selectCurrentAuthorDetails())
  const dispatch = useDispatch()

  const handleClose = () => closeEditAuthorModal()

  const handleSuccess = () => {
    dispatch(loadAuthorDetails(currentAuthorId))
    dispatch(loadAuthor(currentAuthorId))
    handleClose()
  }

  if (isEmpty(authorDetails)) { return null }

  return (
    <Modal show={ editAuthorModalShown } onHide={ () => handleClose() } size='lg' centered backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>Edit author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthorForm id='author_details_form' authorDetails={ authorDetails } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={ () => handleClose() }>
          Close
        </Button>
        <Button variant='primary' form='author_details_form' type='submit'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthorEditModal
