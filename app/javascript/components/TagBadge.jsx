import React from 'react'
import { Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useUrlStore from 'store/urlStore'

const TagBadge = (props) => {
  const { text, id, variant, renderPostfix, className, onClick, ...restProps } = props
  const classnames = classNames(['tag-container', className])
  const label = `#${text}`
  const [{}, { gotoTagBooks }, { tagBooksPath }] = useUrlStore()
  const clickHandler = onClick ? onClick : gotoTagBooks

  return (
    <Badge pill variant={ variant } className={ classnames } { ...restProps }>
      <a className='tag-name' href={ tagBooksPath(id) } onClick={ (e) => { e.preventDefault(); clickHandler(id) } }>
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
