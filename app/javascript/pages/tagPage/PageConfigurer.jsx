import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId, selectCurrentTagId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import { setPageIsLoading } from 'store/metadata/actions'
import { clearListState } from 'widgets/booksListLinear/actions'
import {
  assignFilter,
  assignSortBy,
  fetchBooks,
  setupBooksListSelection,
} from 'widgets/booksListLinear/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'

import PageUrlStore from 'pages/tagPage/PageUrlStore'

const Configurer = () => {
  const dispatch = useDispatch()
  const tagId = useSelector(selectCurrentTagId())

  useEffect(() => {
    if (!tagId) { return }
    dispatch(setPageIsLoading(true))
    dispatch(clearListState())
    dispatch(assignSortBy('popularity'))
    dispatch(setCurrentBookId(null))
    dispatch(prepareNavRefs()).then(() => {
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
