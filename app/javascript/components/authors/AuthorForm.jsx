import { pick } from 'lodash'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import FormInputTags from 'components/FormInputTags'
import apiClient from 'serverApi/apiClient'

import { selectTags  } from 'store/metadata/selectors'

class AuthorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentTags: [], errors: {} }
  }

  sendRequest(formData) {
    const { authorDetails } = this.props
    if (authorDetails.new) {
      return apiClient.postAuthorDetails(formData)
    } else {
      return apiClient.putAuthorDetails(authorDetails.id, formData)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { onSubmit, authorDetails } = this.props
    const { currentTags } = this.state
    const formData = pick(
      event.target.elements,
      'fullname', 'imageUrl', 'reference', 'birthYear', 'deathYear'
    )
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)

    formData.tagNames = currentTags.map(tag => tag.name)

    this.sendRequest(formData).fail((response) => this.setState({ errors: response.responseJSON }))
                              .then((data) => onSubmit(data))
  }

  render() {
    const { id, authorDetails, tags } = this.props
    const { currentTags, errors } = this.state
    const initialTags = authorDetails.new ? [] : tags

    return (
      <Form id={ id } onSubmit={ (e) => this.handleSubmit(e) }>
        <InputLine controlId='fullname' label='Name' value={ authorDetails.fullname } errors={ errors.fullname } autoFocus/>
        <InputLine controlId='imageUrl' label='Photo URL' value={ authorDetails.imageUrl } errors={ errors.image_url }/>
        <InputLine controlId='reference' label='WIKI URL' value={ authorDetails.reference } errors={ errors.reference }/>
        <Row />
        <InputLine controlId='birthYear' label='Year of birth' value={ authorDetails.birthYear } errors={ errors.birth_year }/>
        <InputLine controlId='deathYear' label='Year of death' value={ authorDetails.deathYear } errors={ errors.death_year }/>
        <Row />
        <FormInputTags initialTags={ initialTags } onChange={ (tags) => this.setState({ currentTags: tags }) }/>
      </Form>
    )
  }
}

AuthorForm.propTypes = {
  id: PropTypes.string.isRequired,
  authorDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const { tagIds } = props.authorDetails
  return { tags: selectTags(tagIds)(state) }
}

export default connect(mapStateToProps, null)(AuthorForm)
