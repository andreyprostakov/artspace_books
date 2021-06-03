import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Badge } from 'react-bootstrap'
import TagsInput from 'react-tagsinput'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import 'react-tagsinput/react-tagsinput.css'

import { selectTags } from 'store/selectors'
import GoogleIcon from 'components/icons/GoogleIcon'
import TagBadge from 'components/TagBadge'

const BookFormTags = (props) => {
  const { bookDetails, onChange } = props
  const [localTags, setLocalTags] = useState(useSelector(selectTags(bookDetails.tagIds)))

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

const renderTagCloseIcon = ({ classNameRemove, onRemove }) => {
  return (
    <FontAwesomeIcon icon={ faTimesCircle }
      className={ classNames('tag-remove-icon', classNameRemove) }
      onClick={ (e) => onRemove(key) }
    />
  )

}

const renderTag = (props) => {
  let {tag, key, disabled, classNameRemove, onRemove, getTagDisplayValue, ...other} = props
  return (
    <TagBadge variant='dark' key={ key } text={ getTagDisplayValue(tag) }
      renderPostfix={ () => renderTagCloseIcon({ classNameRemove, onRemove }) }
    />
  )
}

export default BookFormTags
