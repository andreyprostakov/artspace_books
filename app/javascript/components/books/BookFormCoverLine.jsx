import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import GoogleIcon from 'components/icons/GoogleIcon'

const BookFormCoverLine = (props) => {
  const { author, bookDetails, currentTitle } = props
  const errors = props.errors || []

  return (
    <Row className='book-form-goodreads-line'>
      <Form.Label column sm={ 3 }>
        Cover
      </Form.Label>

      <Col sm={ 1 } className='search-goodreads-container' hidden={ !currentTitle }>
        <GoogleIcon queryParts={ ['book cover', author.fullname, currentTitle] } optionalParams={ { tbm: 'isch' } }/>
        <div className='icon-relation'><FontAwesomeIcon icon={ faCaretRight }/></div>
      </Col>

      <Col sm={ 4 }>
        <Form.Group controlId='imageUrl'>
          <Form.Control type='text' placeholder={ bookDetails.imageUrl ? 'URL [SAVED]' : 'URL [NONE]' } isInvalid={ errors.length > 0 } autoComplete='off'/>
          <Form.Control.Feedback type='invalid' tooltip>
            { errors.join('; ') }
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col sm={ 4 }>
        <Form.Group controlId='imageFile' className='book-form-cover-file'>
          <Form.Control type='file'/>
          <Form.Control.Feedback type='invalid' tooltip>
            { errors.join('; ') }
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  )
}

BookFormCoverLine.propTypes = {
  bookDetails: PropTypes.object,
  author: PropTypes.object.isRequired,
  currentTitle: PropTypes.string,
  errors: PropTypes.array
}

export default BookFormCoverLine
