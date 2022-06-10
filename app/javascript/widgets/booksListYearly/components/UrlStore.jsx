import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useUrlStore from 'store/urlStore'

import { selectCurrentBookId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import { selectPageIsLoading } from 'store/metadata/selectors'

const UrlStore = () => {
  const storedBookId = useSelector(selectCurrentBookId())
  const pageLoading = useSelector(selectPageIsLoading())
  const dispatch = useDispatch()
  const [storeReady, setStoreReady] = useState(false)

  const [{ bookId, }, { patch, buildPath }, _paths] = useUrlStore((params, query) => ({
    bookId: parseInt(query.get('book_id')) || null,
  }))

  const updatePathOnChange = (path, dependencies) => {
    useEffect(() => {
      storeReady && !pageLoading && patch(path)
    }, dependencies)
  }

  useEffect(() => {
    dispatch(setCurrentBookId(bookId))
    setStoreReady(true)
  }, [])
  updatePathOnChange(
    buildPath({ params: { book_id: storedBookId } }),
    [storedBookId]
  )

  return null
}

export default UrlStore
