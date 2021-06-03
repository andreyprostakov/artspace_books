import { sortBy, upperCase } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TagBadge from 'components/TagBadge'
import BooksList from 'components/books/BooksList'
import TagRemoveIcon from 'components/icons/TagRemoveIcon'

import { setupStoreForTagPage } from 'store/actions'
import { selectTag } from 'store/selectors'
import { useUrlStore } from 'store/urlStore'

const TagPage = () => {
  const dispatch = useDispatch()
  const [{ tagId }, { gotoBooks }] = useUrlStore()
  const tag = useSelector(selectTag(tagId))

  useEffect(() => {
    dispatch(setupStoreForTagPage(tagId))
  }, [])

  if (!tag) { return null }

  return (
    <div className='tag-page'>
      <TagBadge text={ tag.name } variant='dark' renderPostfix={ () => <TagRemoveIcon onRemove={ () => gotoBooks() }/> }/>
      <BooksList/>
    </div>
  )
}

export default TagPage
