import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import GoogleIcon from 'components/icons/GoogleIcon'

const FormInputImage = (props) => {
  const { imageUrl, label, searchKey, searchPrefix } = props
  const errors = props.errors || []

  return (
    <Row className='form-input-image'>
      <Form.Label column sm={ 3 }>{ label }</Form.Label>

      <Col sm={ 1 } className='search-controls' hidden={ !searchKey }>
        <GoogleIcon queryParts={ [searchPrefix, searchKey] } optionalParams={ { tbm: 'isch' } }/>
        <div className='icon-relation'><FontAwesomeIcon icon={ faCaretRight }/></div>
      </Col>

      <Col sm={ 4 }>
        <Form.Group controlId='imageUrl'>
          <Form.Control type='text' placeholder={ imageUrl ? 'URL [SAVED]' : 'URL [NONE]' }
                        isInvalid={ errors.length > 0 } autoComplete='off'/>
          <Form.Control.Feedback type='invalid' tooltip>
            { errors.join('; ') }
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col sm={ 4 }>
        <Form.Group controlId='imageFile' className='file-controls'>
          <Form.Control type='file'/>
        </Form.Group>
      </Col>
    </Row>
  )
}

FormInputImage.propTypes = {
  imageUrl: PropTypes.string,
  searchKey: PropTypes.string,
  errors: PropTypes.array,
  searchPrefix: PropTypes.string,
}

export default FormInputImage
