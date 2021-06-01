import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import GoogleIcon from 'components/icons/GoogleIcon'

const BookFormCoverLine = (props) => {
  const { author, bookDetails, controlId, currentTitle } = props
  const errors = props.errors || []

  return (
    <Form.Group as={ Row } controlId={ controlId } className='book-form-goodreads-line'>
      <Form.Label column sm={ 3 }>
        Cover URL
      </Form.Label>
      <Col sm={ 1 } className='search-goodreads-container' hidden={ !currentTitle }>
        <GoogleIcon queryParts={ ['book cover', author.fullname, currentTitle] } optionalParams={ { tbm: 'isch' } }/>
        <div className='icon-relation'><FontAwesomeIcon icon={ faCaretRight }/></div>
      </Col>
      <Col sm={ 8 }>
        <Form.Control type='text' defaultValue={ bookDetails.imageUrl } isInvalid={ errors.length > 0 }/>
        <Form.Control.Feedback type='invalid' tooltip>
          { errors.join('; ') }
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

BookFormCoverLine.propTypes = {
  controlId: PropTypes.string.isRequired,
  bookDetails: PropTypes.object,
  author: PropTypes.object.isRequired,
  currentTitle: PropTypes.string,
  errors: PropTypes.array
}

export default BookFormCoverLine
