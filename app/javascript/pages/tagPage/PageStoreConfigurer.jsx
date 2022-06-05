import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId, selectCurrentTagId } from 'store/axis/selectors'
import {
  fetchAllTags,
  fetchAuthors,
  setPageIsLoading,
} from 'store/metadata/actions'
import { clearListState } from 'widgets/booksListLinear/actions'
import {
  assignFilter,
  assignSortBy,
  fetchBooks,
  setupBooksListSelection,
} from 'widgets/booksListLinear/actions'

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
      dispatch(fetchAuthors()),
    ]).then(() => {
      dispatch(assignFilter({ tagId }))
      dispatch(fetchBooks()).then(() => {
        dispatch(setPageIsLoading(false))
        dispatch(setupBooksListSelection())
      })
    })
  }, [tagId])
  return null
}

export default Configurer
