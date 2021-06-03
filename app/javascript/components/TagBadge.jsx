import React from 'react'
import { Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'

const TagBadge = (props) => {
  const { text, variant, renderPostfix } = props

  return (
    <Badge pill variant={ variant } className='tag-container'>
      <span className='tag-name'>
        #{ text }
      </span>
      { renderPostfix && renderPostfix() }
    </Badge>
  )
}

TagBadge.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  renderPostfix: PropTypes.func,
  variant: PropTypes.string
}

TagBadge.defaultProps = {
  variant: 'light'
}

export default TagBadge
