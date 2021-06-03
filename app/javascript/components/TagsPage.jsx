import { sortBy, upperCase } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TagBadge from 'components/TagBadge'

import { setupStoreForTagsPage } from 'store/actions'
import { selectAllTags } from 'store/selectors'

const TagsPage = () => {
  const dispatch = useDispatch()
  const tags = useSelector(selectAllTags())
  const sortedTags = sortBy(tags, tag => upperCase(tag.name))

  useEffect(() => {
    dispatch(setupStoreForTagsPage())
  }, [])

  return (
    <div className='tags-page'>
      { sortedTags.map(tag =>
        <TagBadge key={ tag.id } text={ tag.name } id={ tag.id }
          renderPostfix={ () => (tag.connections_count > 0 && ` (${tag.connections_count})`) }
          variant='dark'
        /> 
      ) }
    </div>
  )
}

export default TagsPage
