import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

import { selectCurrentTagId } from 'store/axis/selectors'
import { selectTagRef } from 'store/tags/selectors'
import Toolbar from 'widgets/sidebar/tagCard/Toolbar'

const TagCard = (props) => {
  const tagId = useSelector(selectCurrentTagId())
  const tag = useSelector(selectTagRef(tagId))

  if (!tag) { return null }
  return (
    <Card className='books-batch-controls sidebar-card-widget'>
      <Card.Header className='widget-title'>Tag: #{ tag.name }</Card.Header>
      <Card.Body>
        <Toolbar tagFull={ tag }/>
      </Card.Body>
    </Card>
  )
}

export default TagCard
