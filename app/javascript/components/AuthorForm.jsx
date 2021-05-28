import { pick } from 'lodash'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import apiClient from 'serverApi/apiClient'

class AuthorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errors: {} }
  }

  sendRequest(formData) {
    const { authorDetails } = this.props
    if (authorDetails.id) {
      return apiClient.putAuthorDetails(authorDetails.id, formData)
    } else {
      return apiClient.postAuthorDetails(formData)
    }
  }

  handleSubmit(event) {
    const { onSubmit, authorDetails } = this.props
    event.preventDefault()
    const formData = pick(
      event.target.elements,
      'fullname', 'imageUrl', 'reference', 'birthYear', 'deathYear'
    )
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)
    this.sendRequest(formData).fail((response) => this.setState({ errors: response.responseJSON }))
                              .then((data) => onSubmit(data))
  }

  render() {
    const { id, authorDetails } = this.props
    const { errors } = this.state

    return (
      <Form id={ id } onSubmit={ (e) => this.handleSubmit(e) }>
        <InputLine controlId='fullname' label='Name' value={ authorDetails.fullname } errors={ errors.fullname } autoFocus/>
        <InputLine controlId='imageUrl' label='Photo URL' value={ authorDetails.imageUrl } errors={ errors.image_url }/>
        <InputLine controlId='reference' label='WIKI URL' value={ authorDetails.reference } errors={ errors.reference }/>
        <Row />
        <InputLine controlId='birthYear' label='Year of birth' value={ authorDetails.birthYear } errors={ errors.birth_year }/>
        <InputLine controlId='deathYear' label='Year of death' value={ authorDetails.deathYear } errors={ errors.death_year }/>
      </Form>
    )
  }
}

AuthorForm.propTypes = {
  id: PropTypes.string.isRequired,
  authorDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default AuthorForm
