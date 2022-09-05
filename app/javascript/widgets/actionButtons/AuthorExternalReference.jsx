import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

const AuthorExternalReference = (props) => {
  const { url } = props

  if (!url) return null

  return (
    <Button variant='outline-info' title='See info...' href={ url } target='_blank'>
      <FontAwesomeIcon icon={ faWikipediaW }/>
    </Button>
  )
}

AuthorExternalReference.propTypes = {
  url: PropTypes.string.isRequired,
}

export default AuthorExternalReference
