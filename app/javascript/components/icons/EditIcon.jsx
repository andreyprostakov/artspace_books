import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const EditIcon = (props) => {
  const { onClick } = props
  return (
    <a className='icon-edit' href='#' target='_blank' onClick={ (e) => { e.preventDefault(); onClick(e) } }>
      <FontAwesomeIcon icon={ faEdit }/>
    </a>
  )
}

EditIcon.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default EditIcon
