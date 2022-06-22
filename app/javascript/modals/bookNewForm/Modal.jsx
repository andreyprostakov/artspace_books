import { isEmpty } from 'lodash'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { selectCurrentAuthorId } from 'store/axis/selectors'
import { reloadAuthor } from 'store/authors/actions'
import { reloadBook } from 'widgets/booksListYearly/actions'
import BookForm from 'modals/bookEditForm/Form'
import ModalStore from 'modals/bookNewForm/UrlStore'
import UrlStoreContext from 'store/urlStore/Context'

const Wrap = () => {
  return (
    <>
      <ModalStore/>
      <BookNewModal/>
    </>
  )
}

const BookNewModal = () => {
  const authorId = useSelector(selectCurrentAuthorId())
  const { routesReady, pageState: { modalBookNewShown }, actions: { closeModal } } = useContext(UrlStoreContext)
  const dispatch = useDispatch()

  const handleSuccess = (data) => {
    dispatch(reloadBook(data.id))
    dispatch(reloadAuthor(authorId))
    closeModal()
  }

  if (!authorId) return null

  return (
    <Modal show={ modalBookNewShown } onHide={ () => closeModal() } size='lg' centered className='book-modal' backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>New book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BookForm id='book_form' bookDetails={ { new: true, authorId: authorId } } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={ () => closeModal() }>
          Close
        </Button>
        <Button variant='primary' form='book_form' type='submit'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Wrap
