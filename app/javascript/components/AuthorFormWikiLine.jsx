import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

import WikiIcon from 'components/icons/WikiIcon'
import GoogleIcon from 'components/icons/GoogleIcon'

const AuthorFormWikiLine = (props) => {
  const { controlId, authorForm, fullname } = props
  const errors = props.errors || []
  const [currentUrl, setUrl] = useState(authorForm.reference)

  return (
    <Form.Group as={ Row } controlId={ controlId } className='author-form-wiki-line'>
      <Form.Label column sm={ 3 }>
        WIKI URL
      </Form.Label>
      <Col sm={ 1 } className='search-wiki-container' hidden={ !fullname }>
        <GoogleIcon queryParts={ ['wiki', fullname] }/>
        <div className='icon-relation'><FontAwesomeIcon icon={ faCaretRight }/></div>
      </Col>
      <Col sm={ 7 }>
        <Form.Control type='text' defaultValue={ currentUrl } isInvalid={ errors.length > 0 }
                      onChange={ (e) => setUrl(e.target.value) } autoComplete='off'/>
        <Form.Control.Feedback type='invalid' tooltip>
          { errors.join('; ') }
        </Form.Control.Feedback>
      </Col>
      <Col sm={ 1 } className='link-wiki-container' hidden={ !currentUrl }>
        <div className='icon-relation'><FontAwesomeIcon icon={ faCaretRight }/></div>
        <WikiIcon url={ currentUrl }/>
      </Col>
    </Form.Group>
  )
}

AuthorFormWikiLine.propTypes = {
  controlId: PropTypes.string.isRequired,
  authorForm: PropTypes.object.isRequired,
  errors: PropTypes.array,
  fullname: PropTypes.string
}

export default AuthorFormWikiLine
