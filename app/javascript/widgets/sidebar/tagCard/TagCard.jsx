import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

const TagCard = (props) => {
  const { tag } = props

  return (
    <Card className='books-batch-controls sidebar-card-widget'>
      <Card.Header className='widget-title'>Tag: #{ tag.name }</Card.Header>
    </Card>
  )
}

TagCard.propTypes = {
  tag: PropTypes.object.isRequired,
}

export default TagCard
