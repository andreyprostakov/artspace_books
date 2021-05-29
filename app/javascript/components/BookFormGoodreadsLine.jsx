import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWikipediaW, faGoodreadsG } from '@fortawesome/free-brands-svg-icons'

const BookFormGoodreadsLine = (props) => {
  const { controlId, bookDetails, currentTitle, author } = props
  const errors = props.errors || []

  const buildUrl = () => {
    if (!currentTitle) { return }

    var params = new URLSearchParams()
    params.append('q', `${service} ${author.fullname} ${currentTitle}`)
    return `http://google.com/search?${params.toString()}`
  }

  return (
    <Form.Group as={ Row } controlId={ controlId }>
      <Form.Label column sm={ 3 }>
        Goodreads URL
      </Form.Label>
      <Col sm={ 1 }>
        <a className='search-goodreads' href={ buildUrl() } target='_blank'><FontAwesomeIcon icon={ faGoodreadsG }/></a>
      </Col>
      <Col sm={ 8 }>
        <Form.Control type='text' defaultValue={ value } isInvalid={ errors.length > 0 }/>
        <Form.Control.Feedback type='invalid' tooltip>
          { errors.join('; ') }
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

FormInputLine.propTypes = {
  controlId: PropTypes.string.isRequired,
  bookDetails: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  errors: PropTypes.array,
  currentTitle: PropTypes.string
}

export default BookFormGoodreadsLine
