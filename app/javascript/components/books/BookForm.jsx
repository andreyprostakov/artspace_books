import { isEmpty, map, pick } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import FormInputImage from 'components/FormInputImage'
import FormInputTags from 'components/FormInputTags'
import BookFormGoodreadsLine from 'components/books/BookFormGoodreadsLine'
import { fetchTagsRefs } from 'store/tags/actions'
import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'
import { selectAuthorRef } from 'store/authors/selectors'
import { selectTagsRefsByIds } from 'store/tags/selectors'
import apiClient from 'store/books/apiClient'

const BookForm = (props) => {
  const { bookDetails, onSubmit } = props
  const authorRef = useSelector(selectAuthorRef(bookDetails.authorId))
  const tags = useSelector(selectTagsRefsByIds(bookDetails.tagIds))
  const dispatch = useDispatch()
  const [state, setState] = useState({
    errors: {},
    currentOriginalTitle: bookDetails.originalTitle,
    currentTitle: bookDetails.title,
    currentTags: [],
  })
  const { currentTags, currentTitle, currentOriginalTitle, errors } = state
  if (!authorRef || isEmpty(bookDetails)) { return null }

  const initialTags = bookDetails.new ? [{ name: 'Novel' }] : tags

  const sendRequest = (bookDetails, formData) => {
    if (bookDetails.new) {
      return apiClient.createBook(formData)
    } else {
      return apiClient.updateBook(bookDetails.id, formData)
    }
  }

  const onServerSuccess = (responseData) => {
    dispatch(addSuccessMessage('Book updated'))
    dispatch(fetchTagsRefs())
    onSubmit(responseData)
  }

  const onServerFailure = (responseData) => {
    const errors = responseData.responseJSON
    console.log(errors)
    const description = map(errors, (messages, attribute) => `${attribute} ${messages.join(', ')}`).join('; ')
    dispatch(addErrorMessage(`Errors: ${description}`))
    setState({ ...state, errors: responseData.responseJSON })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { currentTags } = state
    const formData = pick(
      event.target.elements,
      'yearPublished',
      'title',
      'goodreadsUrl',
      'imageUrl',
      'imageFile',
      'originalTitle',
    )
    Object.keys(formData).forEach(key => formData[key] = formInputToValue(formData[key]))
    formData.authorId = authorRef.id
    formData.tagNames = currentTags.map(tag => tag.name)

    sendRequest(bookDetails, formData).fail(onServerFailure).then(onServerSuccess)
  }

  return (
    <Form id='book_form' className='book-form' onSubmit={ handleSubmit }>
      <InputLine controlId='authorId' label='Author' value={ authorRef.fullname } readOnly/>
      <InputLine controlId='yearPublished' label='Year' value={ bookDetails.yearPublished } errors={ errors.year_published } autoFocus/>
      <InputLine controlId='title' label='Title' value={ bookDetails.title } errors={ errors.title }
                 onChange={ (e) => setState({ ...state, currentTitle: e.target.value }) }/>
      <BookFormGoodreadsLine controlId='goodreadsUrl' bookDetails={ bookDetails }
                             errors={ errors.goodreads_url } authorRef={ authorRef }
                             currentTitle={ currentTitle }/>
      <FormInputImage label='Cover'
                      imageUrl={ bookDetails.imageUrl }
                      errors={ errors.image_url }
                      searchPrefix={ `book cover ${ authorRef.fullname }` }
                      searchKey={ currentOriginalTitle || currentTitle }/>
      <Row />
      <FormInputTags initialTags={ initialTags } onChange={ (tags) => setState({ ...state, currentTags: tags }) }/>
      <InputLine controlId='originalTitle' label='Title (original)' value={ bookDetails.originalTitle } errors={ errors.original_title }
                 onChange={ (e) => setState({ ...state, currentOriginalTitle: e.target.value }) }/>
    </Form>
  )
}

BookForm.propTypes = {
  bookDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const formInputToValue = (inputElement) => {
  return inputElement.type === 'file' ? inputElement.files[0] : inputElement.value
}

export default BookForm
