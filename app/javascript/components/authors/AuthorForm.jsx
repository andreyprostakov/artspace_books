import { map, pick } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import FormInputImage from 'components/FormInputImage'
import FormInputTags from 'components/FormInputTags'
import apiClient from 'serverApi/apiClient'

import { selectTags  } from 'store/metadata/selectors'
import { addMessage } from 'widgets/notifications/actions'

const AuthorForm = (props) => {
  const { authorDetails, id, onSubmit } = props
  const [state, setState] = useState({ currentTags: [], errors: {} })
  const { currentTags, errors } = state
  const tags = useSelector(selectTags(authorDetails.tagIds))
  const initialTags = authorDetails.new ? [] : tags
  const dispatch = useDispatch()

  const onServerSuccess = (responseData) => {
    dispatch(addMessage({ type: 'success', headline: 'Success', message: 'Author updated' }))
    onSubmit(responseData)
  }

  const onServerFailure = (responseData) => {
    const errors = responseData.responseJSON
    console.log(errors)
    const description = map(errors, (messages, attribute) => `${attribute} ${messages.join(', ')}`).join('; ')
    dispatch(addMessage({ type: 'danger', headline: 'Error', message: description }))
    setState({ ...state, errors: responseData.responseJSON })
  }

  const sendRequest = (formData) => {
    if (authorDetails.new) {
      return apiClient.postAuthorDetails(formData)
    } else {
      return apiClient.putAuthorDetails(authorDetails.id, formData)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { currentTags } = state
    const formData = pick(
      event.target.elements,
      'fullname', 'imageUrl', 'reference', 'birthYear', 'deathYear'
    )
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)

    formData.tagNames = currentTags.map(tag => tag.name)

    sendRequest(formData).fail(onServerFailure).then(onServerSuccess)
  }

  return (
    <Form id={ id } onSubmit={ handleSubmit }>
      <InputLine controlId='fullname' label='Name' value={ authorDetails.fullname } errors={ errors.fullname } autoFocus/>
      <FormInputImage label='Photo'
                      imageUrl={ authorDetails.imageUrl }
                      errors={ errors.image_url }
                      searchPrefix='author photo'
                      searchKey={ authorDetails.fullname }/>
      <InputLine controlId='reference' label='WIKI URL' value={ authorDetails.reference } errors={ errors.reference }/>
      <Row />
      <InputLine controlId='birthYear' label='Year of birth' value={ authorDetails.birthYear } errors={ errors.birth_year }/>
      <InputLine controlId='deathYear' label='Year of death' value={ authorDetails.deathYear } errors={ errors.death_year }/>
      <Row />
      <FormInputTags initialTags={ initialTags } onChange={ (tags) => setState({ ...state, currentTags: tags }) }/>
    </Form>
  )
}

AuthorForm.propTypes = {
  id: PropTypes.string.isRequired,
  authorDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default AuthorForm
