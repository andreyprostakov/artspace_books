import { pick } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import SearchRow from 'components/BookFormSearchRow'
import { selectAuthor } from 'store/booksListSlice'
import apiClient from 'serverApi/apiClient'

class BookForm extends React.Component {
  constructor(props) {
    super(props)
    const { bookDetails } = this.props
    this.state = { errors: {}, currentTitle: bookDetails.title }
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
    const { bookDetails, author } = this.props
    const { errors } = this.state

    return (
      <Form id='book_form' onSubmit={ (e) => this.handleSubmit(e) }>
        <InputLine controlId='authorId' label='Author' value={ author?.fullname } readOnly/>
        <InputLine controlId='title' label='Title' value={ bookDetails.title } errors={ errors.title }
          autoFocus onChange={ (e) => this.setState({ currentTitle: e.target.value }) }
        />
        { this.state.currentTitle
          && <SearchRow author={ author } currentTitle={ this.state.currentTitle }/> }
        <InputLine controlId='goodreadsUrl' label='Goodreads URL' value={ bookDetails.goodreadsUrl } errors={ errors.goodreads_url }/>
        <InputLine controlId='imageUrl' label='Cover URL' value={ bookDetails.imageUrl } errors={ errors.image_url }/>
        <Row />
        <InputLine controlId='originalTitle' label='Title (original)' value={ bookDetails.originalTitle } errors={ errors.original_title }/>
        <InputLine controlId='wikiUrl' label='Wiki URL' value={ bookDetails.wikiUrl } errors={ errors.wiki_url }/>
        <InputLine controlId='yearPublished' label='Year' value={ bookDetails.yearPublished } errors={ errors.year_published }/>
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
