import React from 'react'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SidebarWidget = (props) => {
  const { children, className, isCurrent, isParent, show, title } = props

  if (!show) return null

  return (
    <Card className={ classNames('sidebar-card-widget', className) }>
      <Card.Header className='widget-title'>{ title }</Card.Header>
      <Card.Body>{ children }</Card.Body>

      { isCurrent &&
        <div className='widget-header-arrow-triangle-right'/>
      }
      { isParent &&
        <div className='widget-arrow-triangle-down'/>
      }
    </Card>
  )
}

SidebarWidget.propTypes = {
  className: PropTypes.string,
  isCurrent: PropTypes.bool,
  isParent: PropTypes.bool,
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

SidebarWidget.defaultProps = {
  show: true,
}

export default SidebarWidget
