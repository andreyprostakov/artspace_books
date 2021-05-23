import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { pick } from 'lodash'

import { submitBookDetails } from 'store/booksListSlice'
import apiClient from 'serverApi/apiClient'

class BookForm extends React.Component {
  handleSubmit(event) {
    const { onSubmit, bookDetails } = this.props
    event.preventDefault()
    window.ELEMENTS = event.target.elements
    const formData = pick(
      event.target.elements,
      'title', 'originalTitle', 'goodreadsUrl', 'wikiUrl', 'imageUrl', 'yearPublished'
    )
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)
    apiClient.putBookDetails(bookDetails.id, formData).fail((errors) => console.log(errors))
  }

  render() {
    const { bookDetails } = this.props

    return (
      <Form id='book_form' onSubmit={ (e) => this.handleSubmit(e) }>
        <BookFormInput controlId='title' label='Title' value={ bookDetails.title }/>
        <BookFormInput controlId='originalTitle' label='Title (original)' value={ bookDetails.originalTitle }/>
        <BookFormInput controlId='goodreadsUrl' label='Goodreads URL' value={ bookDetails.goodreadsUrl }/>
        <BookFormInput controlId='wikiUrl' label='Wiki URL' value={ bookDetails.wikiUrl }/>
        <BookFormInput controlId='imageUrl' label='Cover URL' value={ bookDetails.imageUrl }/>
        <BookFormInput controlId='yearPublished' label='Year' value={ bookDetails.yearPublished }/>
      </Form>
    )
  }
}

BookForm.propTypes = {
  bookDetails: PropTypes.object.isRequired
}

const BookFormInput = (props) => {
  const { controlId, label, value } = props
  return (
    <Form.Group as={ Row } controlId={ controlId }>
      <Form.Label column sm={ 3 }>
        { label }
      </Form.Label>
      <Col sm={ 9 }>
        <Form.Control type='text' defaultValue={ value }/>
      </Col>
    </Form.Group>
  )
}

BookFormInput.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any
}

export default BookForm
