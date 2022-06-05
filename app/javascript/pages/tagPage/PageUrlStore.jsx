import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUrlStore } from 'store/urlStore'

import { selectCurrentTagId } from 'store/axis/selectors'
import { setCurrentTagId } from 'store/axis/actions'
import { setPageIsLoading } from 'store/metadata/actions'

import BooksListUrlStore from 'widgets/booksListLinear/components/UrlStore'

const UrlStore = () => {
  const storedTagId = useSelector(selectCurrentTagId())
  const dispatch = useDispatch()

  const [{ tagId }] = useUrlStore((params, query) => ({
    tagId: parseInt(params.tagId),
  }))

  useEffect(() => {
    dispatch(setPageIsLoading(true))
    dispatch(setCurrentTagId(tagId))
  }, [tagId])

  return (
    <>
      <BooksListUrlStore/>
    </>
  )
}

export default UrlStore
