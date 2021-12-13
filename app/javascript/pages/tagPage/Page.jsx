import { sortBy, upperCase } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'pages/Layout'
import TagBadge from 'components/TagBadge'
import BooksList from 'widgets/booksList/BooksList'
import TagRemoveIcon from 'components/icons/TagRemoveIcon'

import { selectTag } from 'store/metadata/selectors'
import { setupStoreForTagPage } from 'pages/tagPage/actions'
import { selectNextBookId } from 'widgets/booksList/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import usePageUrlStore from 'pages/tagPage/usePageUrlStore'

const TagPage = () => {
  const dispatch = useDispatch()
  const [{ bookId, tagId }, { addBookWidget, gotoBooks }] = usePageUrlStore()
  const nextBookId = useSelector(selectNextBookId())
  const tag = useSelector(selectTag(tagId))

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForTagPage(tagId)), [tagId])
  useEffect(() => nextBookId && addBookWidget(nextBookId), [nextBookId])

  if (!tag) { return null }

  return (
    <Layout className='tag-page'>
      <TagBadge text={ tag.name } variant='dark' renderPostfix={ () => <TagRemoveIcon onRemove={ () => gotoBooks() }/> }/>
      <BooksList/>
    </Layout>
  )
}

export default TagPage
