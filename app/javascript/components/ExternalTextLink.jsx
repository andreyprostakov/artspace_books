import React from 'react'
import PropTypes from 'prop-types'

const ExternalTextLink = (props) => {
  const { text, ...otherProps } = props
  return (
    <a target='_blank' { ...otherProps }>
      { text }
    </a>
  )
}

ExternalTextLink.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ExternalTextLink
