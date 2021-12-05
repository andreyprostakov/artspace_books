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
  const query = new URLSearchParams(location.search)
  const hash = location.hash

  const authorId = parseInt(params.authorId) || parseInt(query.get('author_id')) || null
  const bookId = parseInt(query.get('book_id')) || null
  const tagId = parseInt(params.tagId) || null
  const sortOrder = params.sortOrder || null

  const calculateState = () => ({
    authorId,
    bookId,
    tagId,
    newAuthorModalShown: hash == NEW_AUTHOR_HASH,
    editAuthorModalShown: authorId && (hash == EDIT_AUTHOR_HASH),
    newBookModalShown: hash == NEW_BOOK_HASH,
    editBookModalShown: bookId && (hash == EDIT_BOOK_HASH),
  })

  const goto = (path) => history.push(path)
  const replaceParam = (name, value) => {
    const url = `${LOCATION.pathname}?${objectToParams({ [name]: value }, LOCATION.search)}${LOCATION.hash}`
    history.replace(url)
  }
  const replaceHash = (value) => {
    const url = `${LOCATION.pathname}${!!LOCATION.search ? LOCATION.search : ''}${value || ''}`
    history.replace(url)
  }
  const showModal = (hash) => replaceHash(hash)
  const [state, setInfo] = useState(calculateState())

  window.PARAMS = params
  window.URL_STATE = state
  window.QUERY = query
  window.LOCATION = location

  useEffect(() => {
    setInfo(calculateState())
  }, [authorId, bookId, tagId, location.hash])

  const actions = {
    gotoBook: (id) => goto(`${location.pathname}?book_id=${id}`),
    gotoBooks: () => goto(`/books?${objectToParams({ book_id: bookId })}`),
    gotoTag: (id) => goto(`/tags/${id}?${objectToParams({ book_id: bookId })}`),
    gotoAuthor: (id) => goto(`/authors/${id}?${objectToParams({ book_id: bookId })}`),
    gotoAuthors: () => goto(`/authors?${objectToParams({ author_id: authorId, sort_order: sortOrder })}`),
    gotoTags: () => goto('/tags'),
    gotoNewAuthor: (id) => goto(`/authors/${id}`),
    gotoAuthorsList: () => goto('/authors'),

    addAuthorToParams: (id) => replaceParam('author_id', id),
    dropAuthorFromParams: () => replaceParam('author_id', null),

    openNewAuthorModal: () => showModal(NEW_AUTHOR_HASH),
    openEditAuthorModal: () => showModal(EDIT_AUTHOR_HASH),
    openNewBookModal: () => showModal(NEW_BOOK_HASH),
    openEditBookModal: () => showModal(EDIT_BOOK_HASH),
    closeModal: () => showModal(''),
  }

  return [state, actions]
}

export const connectToUrlStore = (Component) => {
  return (props) => {
    const [urlStore, urlStoreActions] = useUrlStore()
    return <Component { ...props } urlStore={ urlStore } urlStoreActions= { urlStoreActions }/>
  }
}
