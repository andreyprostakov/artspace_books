import React from 'react'
import { Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { useUrlStore } from 'store/urlStore'

const TagBadge = (props) => {
  const { text, id, variant, renderPostfix } = props
  const label = `#${text}`
  const [{}, { gotoTagBooks }, { tagBooksPath }] = useUrlStore()

  return (
    <Badge pill variant={ variant } className='tag-container'>
      <a className='tag-name' href={ tagBooksPath(id) } onClick={ (e) => { e.preventDefault(); gotoTagBooks(id) } }>
        { label }
      </a>
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
