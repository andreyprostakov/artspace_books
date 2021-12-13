import { sortBy, upperCase } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'pages/Layout'
import TagBadge from 'components/TagBadge'
import { setupStoreForTagsPage } from 'pages/tagsPage/actions'
import { selectAllTags } from 'store/metadata/selectors'

const TagsPage = () => {
  const dispatch = useDispatch()
  const tags = useSelector(selectAllTags())
  const sortedTags = sortBy(tags, tag => upperCase(tag.name))

  useEffect(() => {
    dispatch(setupStoreForTagsPage())
  }, [])

  return (
    <Layout className='tags-page'>
      { sortedTags.map(tag =>
        <TagBadge key={ tag.id } text={ tag.name } id={ tag.id }
          renderPostfix={ () => (tag.connectionsCount > 0 && ` (${tag.connectionsCount})`) }
          variant='dark'
        />
      ) }
    </Layout>
  )
}

export default TagsPage
