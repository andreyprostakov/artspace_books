import { isEmpty } from 'lodash'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { loadCurrentBookDetails, reloadBook } from 'widgets/booksListYearly/actions'
import { setCurrentBookDetails } from 'store/books/actions'
import { selectCurrentBookDetails } from 'store/books/selectors'
import { selectCurrentBookId } from 'store/axis/selectors'
import BookForm from 'modals/bookEditForm/Form'
import ModalStore from 'modals/bookEditForm/UrlStore'
import UrlStoreContext from 'store/urlStore/Context'

const Wrap = () => {
  return (
    <>
      <ModalStore/>
      <BookEditModal/>
    </>
  )
}

const BookEditModal = () => {
  const bookId = useSelector(selectCurrentBookId())
  const bookDetails = useSelector(selectCurrentBookDetails())
  const { pageState: { modalBookEditShown }, actions: { closeModal }, routesReady } = useContext(UrlStoreContext)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setCurrentBookDetails({}))
    closeModal()
  }

  const handleSuccess = () => {
    dispatch(reloadBook(bookId))
    handleClose()
  }

  if (!bookId || !modalBookEditShown) { return null }
  if (isEmpty(bookDetails) || bookDetails.id !== bookId) {
    dispatch(loadCurrentBookDetails())
    return null
  }

  return (
    <Modal show={ modalBookEditShown } onHide={ () => handleClose() } size='lg' centered className='book-modal' backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>Edit book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BookForm id='book_form' bookDetails={ bookDetails } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={ () => handleClose() }>
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
