import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const CloseIcon = (props) => {
  const { onClick } = props
  return (
    <a className='icon-close' href='#' onClick={ (e) => { e.preventDefault(); onClick(e) } }>
      <FontAwesomeIcon icon={ faTimesCircle }/>
    </a>
  )
}

CloseIcon.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default CloseIcon
