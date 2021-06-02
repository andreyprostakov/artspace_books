import React, { useState , useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'

import { objectToParams } from 'utils/objectToParams'

const NEW_AUTHOR_HASH = '#new-author'
const EDIT_AUTHOR_HASH = '#edit-author'
const NEW_BOOK_HASH = '#new-book'
const EDIT_BOOK_HASH = '#edit-book'

export const useUrlStore = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const authorId = parseInt(params.authorId) || null
  const query = new URLSearchParams(location.search)
  const bookId = parseInt(query.get('book_id')) || null

  const calculateState = () => ({
    bookId: bookId,
    authorId: authorId,
    newAuthorModalShown: location.hash == NEW_AUTHOR_HASH,
    editAuthorModalShown: authorId && (location.hash == EDIT_AUTHOR_HASH),
    newBookModalShown: location.hash == NEW_BOOK_HASH,
    editBookModalShown: bookId && (location.hash == EDIT_BOOK_HASH),
  })
  const goto = (path) => history.push(path)
  const showModal = (hash) => goto([location.path, location.search, hash].join(''))
  const [state, setInfo] = useState(calculateState())

  window.PARAMS = params
  window.URL_STATE = state
  window.QUERY = query
  window.LOCATION = location

  useEffect(() => {
    setInfo(calculateState())
  }, [authorId, bookId, location.hash])

  const actions = {
    gotoBook: (id) => goto(`${location.pathname}?book_id=${id}`),
    gotoBooks: () => goto(`/books?${objectToParams({ book_id: bookId })}`),
    gotoAuthor: (id) => goto(`/authors/${id}?${objectToParams({ book_id: bookId })}`),
    gotoAuthors: () => goto('/authors'),
    gotoTags: () => goto('/tags'),
    gotoNewAuthor: (id) => goto(`/authors/${id}`),

    openNewAuthorModal: () => showModal(NEW_AUTHOR_HASH),
    openEditAuthorModal: () => showModal(EDIT_AUTHOR_HASH),
    openNewBookModal: () => showModal(NEW_BOOK_HASH),
    openEditBookModal: () => showModal(EDIT_BOOK_HASH),
    closeModal: () => goto([location.path, location.search].join('')),
  }

  return [state, actions]
}

export const connectToUrlStore = (Component) => {
  return (props) => {
    const [urlStore, urlStoreActions] = useUrlStore()
    return <Component { ...props } urlStore={ urlStore } urlStoreActions= { urlStoreActions }/>
  }
}
