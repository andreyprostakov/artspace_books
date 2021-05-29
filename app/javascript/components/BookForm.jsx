import { pick } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import BookFormGoodreadsLine from 'components/BookFormGoodreadsLine'
import { selectAuthor } from 'store/selectors'
import apiClient from 'serverApi/apiClient'

class BookForm extends React.Component {
  constructor(props) {
    super(props)
    const { bookDetails } = this.props
    this.state = { errors: {}, currentTitle: bookDetails.title }
  }

  sendRequest(bookDetails, formData) {
    const { authorDetails } = this.props
    if (bookDetails.new) {
      return apiClient.postBookDetails(formData)
    } else {
      return apiClient.putBookDetails(bookDetails.id, formData)
    }
  }

  handleSubmit(event) {
    const { onSubmit, bookDetails, author } = this.props
    event.preventDefault()
    const formData = pick(
      event.target.elements,
      'title', 'originalTitle', 'goodreadsUrl', 'wikiUrl', 'imageUrl', 'yearPublished'
    )
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)
    formData.authorId = author.id
    this.sendRequest(bookDetails, formData).fail((response) => this.setState({ errors: response.responseJSON }))
                                           .then((data) => onSubmit(data))
  }

  render() {
    const { bookDetails, author } = this.props
    const { currentTitle, errors } = this.state

    return (
      <Form id='book_form' onSubmit={ (e) => this.handleSubmit(e) }>
        <InputLine controlId='authorId' label='Author' value={ author?.fullname } readOnly/>
        <InputLine controlId='yearPublished' label='Year' value={ bookDetails.yearPublished } errors={ errors.year_published } autoFocus/>
        <InputLine controlId='title' label='Title' value={ bookDetails.title } errors={ errors.title }
                   onChange={ (e) => this.setState({ currentTitle: e.target.value }) }/>
        <BookFormGoodreadsLine controlId='goodreadsUrl' bookDetails={ bookDetails } errors={ errors.goodreadsUrl } author={ author } currentTitle={ currentTitle }/>
        <InputLine controlId='imageUrl' label='Cover URL' value={ bookDetails.imageUrl } errors={ errors.image_url }/>
        <Row />
        <InputLine controlId='originalTitle' label='Title (original)' value={ bookDetails.originalTitle } errors={ errors.original_title }/>
      </Form>
    )
  }
}

BookForm.propTypes = {
  bookDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const { authorId } = props.bookDetails
  return {
    author: selectAuthor(authorId)(state)
  }
}

export default connect(mapStateToProps)(BookForm)
