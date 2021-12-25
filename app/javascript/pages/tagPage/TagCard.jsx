import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

const TagCard = (props) => {
  const { tag } = props

  return (
    <Card className='books-batch-controls'>
      <Card.Header className='widget-title'>Tag</Card.Header>
      <Card.Body>
        { tag.name }
      </Card.Body>
    </Card>
  )
}

TagCard.propTypes = {
  tag: PropTypes.object.isRequired,
}

export default TagCard
