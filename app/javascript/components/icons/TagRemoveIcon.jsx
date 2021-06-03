import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

const TagRemoveIcon = (props) => {
  const { className, onRemove } = props
  return (
    <FontAwesomeIcon icon={ faTimesCircle }
      className={ classNames('tag-remove-icon', className) }
      onClick={ () => onRemove() }
    />
  )
}

export default TagRemoveIcon
