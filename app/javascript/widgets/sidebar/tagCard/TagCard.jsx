import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

import { selectCurrentTagId } from 'store/axis/selectors'
import { selectTag } from 'store/metadata/selectors'

const TagCard = (props) => {
  const tagId = useSelector(selectCurrentTagId())
  const tag = useSelector(selectTag(tagId))

  if (!tag) { return null }
  return (
    <Card className='books-batch-controls sidebar-card-widget'>
      <Card.Header className='widget-title'>Tag: #{ tag.name }</Card.Header>
    </Card>
  )
}

export default TagCard
