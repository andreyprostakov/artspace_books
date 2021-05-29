import { compact } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const GoogleIcon = (props) => {
  const { queryParts } = props
  if (compact(queryParts).length !== queryParts.length) { return null }

  var params = new URLSearchParams()
  params.append('q', queryParts.join(' '))
  const url = `http://google.com/search?${params.toString()}`

  return (
    <a className='icon-google' href={ url } target='_blank'>
      <FontAwesomeIcon icon={ faGoogle }/>
    </a>
  )
}

GoogleIcon.propTypes = {
  queryParts: PropTypes.array.isRequired
}

export default GoogleIcon
