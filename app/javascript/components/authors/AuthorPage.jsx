import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AuthorBooksList from 'components/authors/AuthorBooksList'
import { selectCurrentAuthorId } from 'store/axis/selectors'
import { setupStoreForAuthorPage } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const AuthorPage = () => {
  const [{ authorId, bookId }] = useUrlStore()
  const dispatch = useDispatch()
  const currentAuthorId = useSelector(selectCurrentAuthorId())

  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorPage(authorId, bookId))
  }, [authorId])

  if (!currentAuthorId) { return null }

  return (
    <AuthorBooksList/>
  )
}

export default AuthorPage
