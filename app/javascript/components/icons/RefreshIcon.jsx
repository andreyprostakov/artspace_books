import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

const RefreshIcon = (props) => {
  const { onClick } = props
  return (
    <a className={ classNames('icon-refresh', props.className) } href='#' target='_blank' onClick={ (e) => { e.preventDefault(); onClick(e) } }>
      <FontAwesomeIcon icon={ faSync }/>
    </a>
  )
}

RefreshIcon.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default RefreshIcon
