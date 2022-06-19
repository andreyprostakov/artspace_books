import { map, pick } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import apiClient from 'store/tags/apiClient'

import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'

const TagForm = (props) => {
  const { tag, id, onSubmit } = props
  const dispatch = useDispatch()

  const onServerSuccess = (responseData) => {
    dispatch(addSuccessMessage('Tag updated'))
    onSubmit(responseData)
  }

  const onServerFailure = (responseData) => {
    const errors = responseData.responseJSON.errors
    const description = map(errors, (messages, attribute) => `${attribute} ${messages.join(', ')}`).join('; ')
    dispatch(addErrorMessage(`Errors: ${description}`))
  }

  const sendRequest = (formData) => {
    return apiClient.updateTag(tag.id, formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = pick(event.target.elements, 'name')
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)
    sendRequest(formData).fail(onServerFailure).then(onServerSuccess)
  }

  return (
    <Form id={ id } onSubmit={ handleSubmit }>
      <InputLine controlId='name' label='Name' value={ tag.name }/>
    </Form>
  )
}

TagForm.propTypes = {
  id: PropTypes.string.isRequired,
  tag: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default TagForm
