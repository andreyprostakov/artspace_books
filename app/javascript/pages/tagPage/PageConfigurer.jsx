import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId, selectCurrentTagId } from 'store/axis/selectors'
import { fetchAuthorsRefs } from 'store/authors/actions'
import { fetchAllTags, setPageIsLoading } from 'store/metadata/actions'
import { clearListState } from 'widgets/booksListLinear/actions'
import {
  assignFilter,
  assignSortBy,
  fetchBooks,
  setupBooksListSelection,
} from 'widgets/booksListLinear/actions'

import PageUrlStore from 'pages/tagPage/PageUrlStore'

const Configurer = () => {
  const dispatch = useDispatch()
  const tagId = useSelector(selectCurrentTagId())

  useEffect(() => {
    if (!tagId) { return }
    dispatch(setPageIsLoading(true))
    dispatch(clearListState())
    dispatch(assignSortBy('popularity'))
    Promise.all([
      dispatch(fetchAllTags()),
      dispatch(fetchAuthorsRefs()),
    ]).then(() => {
      dispatch(assignFilter({ tagId }))
      dispatch(fetchBooks()).then(() => {
        dispatch(setPageIsLoading(false))
        dispatch(setupBooksListSelection())
      })
    })
  }, [tagId])
  return <PageUrlStore/>
}

export default Configurer
