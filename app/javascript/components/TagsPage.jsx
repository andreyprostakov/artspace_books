import { sortBy } from 'lodash'
import React, { useEffect } from 'react'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Badge } from 'react-bootstrap'

import { setupStoreForTagsPage } from 'store/actions'
import { selectAllTags } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'

const TagsPage = () => {
  const dispatch = useDispatch()
  const tags = useSelector(selectAllTags())
  const sortedTags = sortBy(tags, 'name')

  useEffect(() => {
    dispatch(setupStoreForTagsPage())
  }, [])

  return (
    <div className='tags-page'>
      { sortedTags.map(tag =>
        <Badge pill variant='dark' key={ tag.id } className='tag-container'>
          { tag.name }
          { tag.connections_count > 0 && ` (${tag.connections_count})` }
        </Badge>
      )}
    </div>
  )
}

export default TagsPage
