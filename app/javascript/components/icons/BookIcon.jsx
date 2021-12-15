import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const BookIcon = (props) => {
  const { onClick } = props
  return (
    <a className='icon-edit' href='#' onClick={ (e) => { e.preventDefault(); onClick(e) } }>
      <FontAwesomeIcon icon={ faBook }/>
    </a>
  )
}

BookIcon.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BookIcon
