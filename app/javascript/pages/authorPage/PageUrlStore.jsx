import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUrlStore } from 'store/urlStore'

import { setCurrentAuthorId } from 'store/axis/actions'
import { setPageIsLoading } from 'store/metadata/actions'

import BooksListUrlStore from 'widgets/booksListLinear/components/UrlStore'

const UrlStore = () => {
  const dispatch = useDispatch()

  const [{ authorId }] = useUrlStore((params, query) => ({
    authorId: parseInt(params.authorId),
  }))

  useEffect(() => {
    dispatch(setPageIsLoading(true))
    dispatch(setCurrentAuthorId(authorId))
  }, [authorId])

  return (
    <>
      <BooksListUrlStore/>
    </>
  )
}

export default UrlStore
