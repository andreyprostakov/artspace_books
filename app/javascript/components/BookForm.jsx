import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { pick } from 'lodash'

import apiClient from 'serverApi/apiClient'

class BookForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errors: {} }
  }

  handleSubmit(event) {
    const { onSubmit, bookDetails } = this.props
    event.preventDefault()
    const formData = pick(
      event.target.elements,
      'title', 'originalTitle', 'goodreadsUrl', 'wikiUrl', 'imageUrl', 'yearPublished'
    )
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)
    apiClient.putBookDetails(bookDetails.id, formData)
             .fail((response) => this.setState({ errors: response.responseJSON }))
             .then(() => onSubmit())
  }

  render() {
    const { bookDetails } = this.props
    const { errors } = this.state

    return (
      <Form id='book_form' onSubmit={ (e) => this.handleSubmit(e) }>
        <BookFormInput controlId='title' label='Title' value={ bookDetails.title } errors={ errors.title } autoFocus/>
        <BookFormInput controlId='originalTitle' label='Title (original)' value={ bookDetails.originalTitle } errors={ errors.original_title }/>
        <BookFormInput controlId='goodreadsUrl' label='Goodreads URL' value={ bookDetails.goodreadsUrl } errors={ errors.goodreads_url }/>
        <BookFormInput controlId='wikiUrl' label='Wiki URL' value={ bookDetails.wikiUrl } errors={ errors.wiki_url }/>
        <BookFormInput controlId='imageUrl' label='Cover URL' value={ bookDetails.imageUrl } errors={ errors.image_url }/>
        <BookFormInput controlId='yearPublished' label='Year' value={ bookDetails.yearPublished } errors={ errors.year_published }/>
      </Form>
    )
  }
}

BookForm.propTypes = {
  bookDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const BookFormInput = (props) => {
  const { controlId, label, value, autoFocus } = props
  const errors = props.errors || []
  return (
    <Form.Group as={ Row } controlId={ controlId }>
      <Form.Label column sm={ 3 }>
        { label }
      </Form.Label>
      <Col sm={ 9 }>
        <Form.Control type='text' defaultValue={ value } isInvalid={ errors.length > 0 } autoFocus={ autoFocus }/>
        <Form.Control.Feedback type='invalid' tooltip>
          { errors.join('; ') }
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

BookFormInput.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  errors: PropTypes.array
}
BookFormInput.defaultProps = {
  autoFocus: false
}

export default BookForm
