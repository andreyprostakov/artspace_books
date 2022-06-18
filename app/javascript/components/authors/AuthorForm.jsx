import { map, pick } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import FormInputImage from 'components/FormInputImage'
import FormInputTags from 'components/FormInputTags'
import apiClient from 'store/authors/apiClient'

import { selectTagsRefsByIds } from 'store/tags/selectors'
import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'

const AuthorForm = (props) => {
  const { authorFull, id, onSubmit } = props
  const [state, setState] = useState({ currentTags: [], fullname: authorFull.fullname, errors: {} })
  const { currentTags, errors } = state
  const tags = useSelector(selectTagsRefsByIds(authorFull.tagIds))
  const initialTags = authorFull.new ? [] : tags
  const dispatch = useDispatch()

  const onServerSuccess = (responseData) => {
    dispatch(addSuccessMessage('Author updated'))
    onSubmit(responseData)
  }

  const onServerFailure = (responseData) => {
    const errors = responseData.responseJSON.errors
    console.log(errors)
    const description = map(errors, (messages, attribute) => `${attribute} ${messages.join(', ')}`).join('; ')
    dispatch(addErrorMessage(`Errors: ${description}`))
    setState({ ...state, errors: responseData.responseJSON })
  }

  const sendRequest = (formData) => {
    if (authorFull.new) {
      return apiClient.postNewAuthor(formData)
    } else {
      return apiClient.putAuthorUpdates(authorFull.id, formData)
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
      <InputLine controlId='fullname' label='Name'
                 value={ authorFull.fullname } errors={ errors.fullname } autoFocus
                 onChange={ e => setState({ ...state, fullname: e.target.value }) }/>
      <FormInputImage label='Photo'
                      imageUrl={ authorFull.imageUrl }
                      errors={ errors.image_url }
                      searchPrefix='author photo'
                      searchKey={ state.fullname }/>
      <InputLine controlId='reference' label='WIKI URL' value={ authorFull.reference } errors={ errors.reference }/>
      <Row />
      <InputLine controlId='birthYear' label='Year of birth' value={ authorFull.birthYear } errors={ errors.birth_year }/>
      <InputLine controlId='deathYear' label='Year of death' value={ authorFull.deathYear } errors={ errors.death_year }/>
      <Row />
      <FormInputTags initialTags={ initialTags } onChange={ (tags) => setState({ ...state, currentTags: tags }) }/>
    </Form>
  )
}

AuthorForm.propTypes = {
  id: PropTypes.string.isRequired,
  authorFull: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default AuthorForm
