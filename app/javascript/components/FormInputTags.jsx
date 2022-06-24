import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Badge } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import 'react-tagsinput/react-tagsinput.css'

import GoogleIcon from 'components/icons/GoogleIcon'
import FormTagBadge from 'components/FormTagBadge'
import TagRemoveIcon from 'components/icons/TagRemoveIcon'
import TagAutocompleteInput from 'components/TagAutocompleteInput'

const FormInputTags = (props) => {
  const { initialTags, onChange } = props
  const [localTags, setLocalTags] = useState(initialTags || [])

  useEffect(() => onChange(localTags), [localTags])

  return (
    <Form.Group as={ Row } className='book-form-tags'>
      <Form.Label column sm={ 3 }>Tags</Form.Label>

      <Col sm={ 9 }>
        <TagsInput value={ localTags }
                   renderTag={ renderTag }
                   renderInput={ renderInput }
                   onChange={ (tags) => setLocalTags(tags) }
                   tagDisplayProp='name'
                   className='form-tags-input'/>
      </Col>
    </Form.Group>
  )
}

FormInputTags.propTypes = {
  initialTags: PropTypes.array,
  onChange: PropTypes.func
}

const renderTag = (props) => {
  let {tag, key, disabled, classNameRemove, onRemove, getTagDisplayValue, ...other} = props
  return (
    <FormTagBadge variant='dark' key={ key } text={ getTagDisplayValue(tag) }
                  renderPostfix={ () => <TagRemoveIcon className={ classNameRemove } onRemove={ () => onRemove(key) }/> }/>
  )
}

const renderInput = ({ addTag, ...props }) => {
  const handleOnChange = (e, { newValue, method }) => {
    if (method === 'enter') {
      e.preventDefault()
    } else {
      props.onChange(e)
    }
  }

  return (
    <TagAutocompleteInput onSuggestionSelected={ (tag) => addTag(tag) }
                          inputProps={ { ...props, onChange: handleOnChange } }/>
  )
}

export default FormInputTags
