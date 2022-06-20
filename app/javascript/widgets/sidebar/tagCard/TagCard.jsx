import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

import { selectCurrentTagIndexEntry } from 'store/tags/selectors'
import Toolbar from 'widgets/sidebar/tagCard/Toolbar'

const TagCard = (props) => {
  const tagIndexEntry = useSelector(selectCurrentTagIndexEntry())

  if (!tagIndexEntry) { return null }
  return (
    <Card className='books-batch-controls sidebar-card-widget'>
      <Card.Header className='widget-title'>Tag: #{ tagIndexEntry.name }</Card.Header>
      <Card.Body>
        <Toolbar tagIndexEntry={ tagIndexEntry }/>
      </Card.Body>
    </Card>
  )
}

export default TagCard
