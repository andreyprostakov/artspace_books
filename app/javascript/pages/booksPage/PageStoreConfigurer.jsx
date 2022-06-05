import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId } from 'store/axis/selectors'
import {
  fetchAllTags,
  fetchAuthors,
  setPageIsLoading,
} from 'store/metadata/actions'
import {
  clearListState,
  fetchYears,
  reloadBook,
  setupBooksListSelection,
} from 'widgets/booksList/actions'

const Configurer = () => {
  const dispatch = useDispatch()
  const bookId = useSelector(selectCurrentBookId())

  useEffect(() => {
    dispatch(setPageIsLoading(true))
    dispatch(clearListState())

    Promise.all([
      dispatch(fetchAllTags()),
      dispatch(fetchAuthors()),
      dispatch(fetchYears()),
    ]).then(() =>
      dispatch(setupBooksListSelection())
    ).then(() =>
      dispatch(setPageIsLoading(false))
    )
  }, [])

  return null
}

export default Configurer