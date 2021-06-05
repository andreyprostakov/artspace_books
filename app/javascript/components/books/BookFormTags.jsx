import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Badge } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import 'react-tagsinput/react-tagsinput.css'

import { selectTags } from 'store/selectors'
import GoogleIcon from 'components/icons/GoogleIcon'
import TagBadge from 'components/TagBadge'
import TagRemoveIcon from 'components/icons/TagRemoveIcon'

const BookFormTags = (props) => {
  const { bookDetails, onChange } = props
  const [localTags, setLocalTags] = useState(
    bookDetails.new ? [{ name: 'Novel' }] : useSelector(selectTags(bookDetails.tagIds))
  )

  useEffect(() => {
    onChange(localTags)
  }, [localTags])

  return (
    <Form.Group as={ Row } className='book-form-tags'>
      <Form.Label column sm={ 3 }>
        Tags
      </Form.Label>

      <Col sm={ 9 }>
        <TagsInput value={ localTags } renderTag={ renderTag } onChange={ (tags) => setLocalTags(tags) } tagDisplayProp='name'/>
      </Col>
    </Form.Group>
  )
}

BookFormTags.propTypes = {
  bookDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

const renderTag = (props) => {
  let {tag, key, disabled, classNameRemove, onRemove, getTagDisplayValue, ...other} = props
  return (
    <TagBadge variant='dark' key={ key } text={ getTagDisplayValue(tag) }
      renderPostfix={ () => <TagRemoveIcon className={ classNameRemove } onRemove={ () => onRemove(key) }/> }
    />
  )
}

export default BookFormTags
