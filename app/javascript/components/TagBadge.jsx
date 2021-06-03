import React from 'react'
import { Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { useUrlStore } from 'store/urlStore'

const TagBadge = (props) => {
  const { text, id, variant, renderPostfix } = props
  const label = `#${text}`
  const [{ tagId }, { gotoTag }] = useUrlStore()

  return (
    <Badge pill variant={ variant } className='tag-container'>
      <span className='tag-name' onClick={ (e) => id && gotoTag(id) }>
        { label }
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
  id: PropTypes.number,
  renderPostfix: PropTypes.func,
  variant: PropTypes.string
}

TagBadge.defaultProps = {
  variant: 'light'
}

export default TagBadge
