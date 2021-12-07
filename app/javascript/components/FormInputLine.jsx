import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FormInputLine = (props) => {
  const { controlId, label, value, autoFocus, readOnly, onChange } = props
  const errors = props.errors || []
  return (
    <Form.Group as={ Row } controlId={ controlId }>
      <Form.Label column sm={ 3 }>
        { label }
      </Form.Label>
      <Col sm={ 9 }>
        <Form.Control type='text' defaultValue={ value } isInvalid={ errors.length > 0 }
          { ...{ autoFocus, readOnly, onChange } }
          autoComplete='off'
        />
        <Form.Control.Feedback type='invalid' tooltip>
          { errors.join('; ') }
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

FormInputLine.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  errors: PropTypes.array,
  onChange: PropTypes.func
}
FormInputLine.defaultProps = {
  autoFocus: false
}

export default FormInputLine
