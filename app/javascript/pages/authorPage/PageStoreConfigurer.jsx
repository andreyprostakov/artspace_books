import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId, selectCurrentAuthorId } from 'store/axis/selectors'
import { fetchAuthorFull } from 'store/authors/actions'
import { setPageIsLoading } from 'store/metadata/actions'
import { clearListState } from 'widgets/booksListLinear/actions'
import {
  assignFilter,
  assignPerPage,
  assignSortBy,
  fetchBooks,
} from 'widgets/booksListLinear/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'

const Configurer = () => {
  const dispatch = useDispatch()
  const authorId = useSelector(selectCurrentAuthorId())
  const bookId = useSelector(selectCurrentBookId())

  useEffect(() => {
    if (!authorId) { return }
    dispatch(setPageIsLoading(true))
    dispatch(clearListState())
    dispatch(assignSortBy('year'))
    dispatch(assignPerPage(60))
    Promise.all([
      dispatch(prepareNavRefs()),
      dispatch(fetchAuthorFull(authorId)),
    ]).then(() => {
      dispatch(assignFilter({ authorId }))
      dispatch(fetchBooks()).then(() => {
        dispatch(setPageIsLoading(false))
      })
    })
  }, [authorId])

  return null
}

export default Configurer
