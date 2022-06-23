import { map, pick } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

import InputLine from 'components/FormInputLine'
import FormSelect from 'components/FormSelect'
import apiClient from 'store/tags/apiClient'
import { selectCategories, selectCategory } from 'store/tags/selectors'
import { addErrorMessage, addSuccessMessage } from 'widgets/notifications/actions'

const TagForm = (props) => {
  const { tag, id, onSubmit } = props
  const dispatch = useDispatch()
  const category = useSelector(selectCategory(tag.categoryId))
  const categories = useSelector(selectCategories())

  if (!category) return null

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
    const formData = pick(event.target.elements, 'name', 'categoryId')
    Object.keys(formData).forEach(key => formData[key] = formData[key].value)
    sendRequest(formData).fail(onServerFailure).then(onServerSuccess)
  }

  return (
    <Form id={ id } onSubmit={ handleSubmit }>
      <InputLine controlId='name' label='Name' value={ tag.name }/>

      <FormSelect controlId='categoryId' label='Category' value={ category.id }
                  collection={ categories.map(category => ({ value: category.id, label: category.name })) }/>
    </Form>
  )
}

TagForm.propTypes = {
  id: PropTypes.string.isRequired,
  tag: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default TagForm
