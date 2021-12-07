import { sortBy, upperCase } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'pages/Layout'
import TagBadge from 'components/TagBadge'
import BooksList from 'components/books/BooksList'
import TagRemoveIcon from 'components/icons/TagRemoveIcon'

import { setupStoreForTagPage } from 'store/actions'
import { selectTag } from 'store/selectors'
import usePageUrlStore from 'pages/tagPage/usePageUrlStore'

const TagPage = () => {
  const dispatch = useDispatch()
  const [{ tagId }, { gotoBooks }] = usePageUrlStore()
  const tag = useSelector(selectTag(tagId))

  useEffect(() => {
    dispatch(setupStoreForTagPage(tagId))
  }, [])

  if (!tag) { return null }

  return (
    <Layout className='tag-page'>
      <TagBadge text={ tag.name } variant='dark' renderPostfix={ () => <TagRemoveIcon onRemove={ () => gotoBooks() }/> }/>
      <BooksList/>
    </Layout>
  )
}

export default TagPage
