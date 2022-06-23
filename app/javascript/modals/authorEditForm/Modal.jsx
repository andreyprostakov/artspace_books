import { isEmpty } from 'lodash'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { selectAuthorFull } from 'store/authors/selectors'
import { reloadAuthor } from 'store/authors/actions'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import AuthorForm from 'modals/authorEditForm/Form'
import ModalStore from 'modals/authorEditForm/UrlStore'
import UrlStoreContext from 'store/urlStore/Context'

const Wrap = () => {
  return (
    <>
      <ModalStore/>
      <AuthorEditModal/>
    </>
  )
}

const AuthorEditModal = () => {
  const { pageState: { modalAuthorEditShown }, actions: { closeModal } } = useContext(UrlStoreContext)
  const currentAuthorId = useSelector(selectCurrentAuthorId())
  const authorFull = useSelector(selectAuthorFull(currentAuthorId))
  const dispatch = useDispatch()

  const handleSuccess = () => {
    dispatch(reloadAuthor(currentAuthorId))
    closeModal()
  }

  if (isEmpty(authorFull)) { return null }

  return (
    <Modal show={ modalAuthorEditShown } onHide={ () => closeModal() } size='lg' centered backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>Edit author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthorForm id='author_details_form' authorFull={ authorFull } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={ () => closeModal() }>
          Close
        </Button>
        <Button variant='primary' form='author_details_form' type='submit'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Wrap
