import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useUrlStore from 'store/urlStore'

import { selectCurrentBookId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import { selectPageIsLoading } from 'store/metadata/selectors'
import { selectPage, selectPerPage, selectSortBy } from 'widgets/booksListLinear/selectors'
import { assignPage, assignPerPage, assignSortBy } from 'widgets/booksListLinear/actions'

const UrlStore = () => {
  const storedBookId = useSelector(selectCurrentBookId())
  const storedPage = useSelector(selectPage())
  const storedPerPage = useSelector(selectPerPage())
  const storedSortBy = useSelector(selectSortBy())
  const pageLoading = useSelector(selectPageIsLoading())
  const dispatch = useDispatch()
  const [storeReady, setStoreReady] = useState(false)

  const [{ bookId, page, perPage, sortBy }, { patch, buildPath }, _paths] = useUrlStore((params, query) => ({
    bookId: parseInt(query.get('book_id')) || null,
    page: parseInt(query.get('page')) || null,
    perPage: parseInt(query.get('per_page')) || null,
    sortBy: query.get('sort_by'),
  }))

  const updatePathOnChange = (path, dependencies) => {
    useEffect(() => {
      storeReady && !pageLoading && patch(path)
    }, dependencies)
  }

  useEffect(() => {
    dispatch(setCurrentBookId(bookId))
    dispatch(assignPage(page))
    dispatch(assignPerPage(perPage))
    dispatch(assignSortBy(sortBy))
    setStoreReady(true)
  }, [])

  updatePathOnChange(
    buildPath({ params: { page: storedPage, per_page: storedPerPage, sort_by: storedSortBy } }),
    [storedPage, storedSortBy]
  )
  updatePathOnChange(
    buildPath({ params: { book_id: storedBookId } }),
    [storedBookId]
  )

  return null
}

export default UrlStore
