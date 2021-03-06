import { isEmpty } from 'lodash'
import React, { createRef, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { selectCurrentTagIndexEntry } from 'store/tags/selectors'
import { reloadTag } from 'store/tags/actions'
import EditUrlStore from 'modals/tagEditForm/UrlStore'
import Form from 'modals/tagEditForm/Form'
import UrlStoreContext from 'store/urlStore/Context'

const Wrap = () => {
  return (
    <>
      <EditUrlStore/>
      <EditModal/>
    </>
  )
}

const EditModal = () => {
  const { pageState: { modalTagEditShown },
          actions: { closeModal } } = useContext(UrlStoreContext)
  const dispatch = useDispatch()
  const tag = useSelector(selectCurrentTagIndexEntry())

  const handleSuccess = () => {
    dispatch(reloadTag(tag.id))
    closeModal()
  }

  if (isEmpty(tag)) { return null }

  return (
    <Modal show={ modalTagEditShown } onHide={ () => closeModal() } size='lg' centered backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>Edit tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='tag_form' tag={ tag } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={ () => closeModal() }>
          Close
        </Button>
        <Button variant='primary' form='tag_form' type='submit' value='a'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Wrap
