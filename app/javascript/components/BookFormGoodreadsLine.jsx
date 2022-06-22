import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import GoodreadsIcon from 'components/icons/GoodreadsIcon'
import GoogleIcon from 'components/icons/GoogleIcon'

const BookFormGoodreadsLine = (props) => {
  const { controlId, bookDetails, currentTitle, authorRef } = props
  const errors = props.errors || []
  const [currentUrl, setUrl] = useState(bookDetails.goodreadsUrl)

  return (
    <Form.Group as={ Row } controlId={ controlId } className='book-form-goodreads-line'>
      <Form.Label column sm={ 3 }>
        Goodreads URL
      </Form.Label>
      <Col sm={ 1 } className='search-goodreads-container' hidden={ !currentTitle }>
        <GoogleIcon queryParts={ ['goodreads', authorRef.fullname, currentTitle] }/>
        <div className='icon-relation'><FontAwesomeIcon icon={ faCaretRight }/></div>
      </Col>
      <Col sm={ 7 }>
        <Form.Control type='text' defaultValue={ currentUrl } isInvalid={ errors.length > 0 }
          onChange={ (e) => setUrl(e.target.value) } autoComplete='off'
        />
        <Form.Control.Feedback type='invalid' tooltip>
          { errors.join('; ') }
        </Form.Control.Feedback>
      </Col>
      <Col sm={ 1 } className='link-goodreads-container' hidden={ !currentUrl }>
        <div className='icon-relation'><FontAwesomeIcon icon={ faCaretRight }/></div>
        <GoodreadsIcon url={ currentUrl }/>
      </Col>
    </Form.Group>
  )
}

BookFormGoodreadsLine.propTypes = {
  controlId: PropTypes.string.isRequired,
  bookDetails: PropTypes.object.isRequired,
  authorRef: PropTypes.object.isRequired,
  errors: PropTypes.array,
  currentTitle: PropTypes.string
}

export default BookFormGoodreadsLine
