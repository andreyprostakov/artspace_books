import { isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { selectCurrentAuthorId } from 'store/axis/selectors'
import { reloadAuthor } from 'store/metadata/actions'
import { reloadBook } from 'widgets/booksListYearly/actions'
import BookForm from 'components/books/BookForm'
import useUrlStore from 'store/urlStore'

const BookNewModal = () => {
  const authorId = useSelector(selectCurrentAuthorId())
  const [{ newBookModalShown }, { closeModal }] = useUrlStore()
  const dispatch = useDispatch()

  const handleSuccess = (data) => {
    dispatch(reloadBook(data.id))
    dispatch(reloadAuthor(authorId))
    closeModal()
  }

  if (!authorId) return null

  return (
    <Modal show={ newBookModalShown } onHide={ () => closeModal() } size='lg' centered className='book-modal' backdropClassName='book-modal-backdrop'>
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

export default BookNewModal
