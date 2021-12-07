import React, { useState , useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'

import { objectToParams } from 'utils/objectToParams'

const NEW_AUTHOR_HASH = '#new-author'
const EDIT_AUTHOR_HASH = '#edit-author'
const NEW_BOOK_HASH = '#new-book'
const EDIT_BOOK_HASH = '#edit-book'

const absolutePaths = {
  authorsPath: ({ authorId, sortOrder } = {}) => `/authors${ objectToParams({ author_id: authorId, sort_order: sortOrder }) }`,
  authorBooksPath: (authorId, { bookId } = {}) => `/authors/${authorId}${ objectToParams({ book_id: bookId }) }`,
  booksPath: ({ bookId } = {}) => `/books${ objectToParams({ book_id: bookId }) }`,
  tagsPath: () => '/tags',
  tagBooksPath: (tagId, { bookId } = {}) => `/tags/${tagId}${ objectToParams({ book_id: bookId }) }`,
}

export const useUrlStore = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const query = new URLSearchParams(location.search)
  const hash = location.hash

  window.PARAMS = params
  window.URL_STATE = state
  window.QUERY = query
  window.LOCATION = location

  const authorId = parseInt(params.authorId) || parseInt(query.get('author_id')) || null
  const bookId = parseInt(query.get('book_id')) || null
  const tagId = parseInt(params.tagId) || null
  const sortOrder = params.sortOrder || null

  const calculateState = () => ({
    authorId,
    bookId,
    tagId,
    newAuthorModalShown: hash == NEW_AUTHOR_HASH,
    editAuthorModalShown: !!authorId && (hash == EDIT_AUTHOR_HASH),
    newBookModalShown: hash == NEW_BOOK_HASH,
    editBookModalShown: bookId && (hash == EDIT_BOOK_HASH),
  })

  const goto = (path) => history.push(path)
  const patch = (path) => history.replace(path)
  const buildPath = ({ path, params, hash } = {}) => {
    return [
      path ?? LOCATION.pathname,
      objectToParams(params ?? {}, LOCATION.search),
      hash ?? LOCATION.hash
    ].join('')
  }
  const showModal = (hash) => patch(buildPath({ hash: hash }))

  const paths = {
    ...absolutePaths,
    newAuthorModalPath: () => buildPath({ hash: NEW_AUTHOR_HASH }),
    editAuthorModalPath: (authorId) => buildPath({ params: { authorId }, hash: EDIT_AUTHOR_HASH }),
    newBookModalPath: () => buildPath({ hash: NEW_BOOK_HASH }),
    editBookModalPath: (bookId) => buildPath({ params: { bookId }, hash: EDIT_BOOK_HASH }),
  }

  const [state, setInfo] = useState(calculateState())

  useEffect(() => {
    setInfo(calculateState())
  }, [authorId, bookId, tagId, location.hash])

  const actions = {
    gotoBook: (id) => goto(paths.booksPath({ bookId: id })),
    gotoBooks: () => goto(paths.booksPath()),
    gotoAuthorBooks: (id) => goto(paths.authorBooksPath(id)),
    gotoAuthors: () => goto(paths.authorsPath()),
    gotoTagBooks: (id) => goto(paths.tagBooksPath(id)),
    gotoTags: () => goto(paths.tagsPath()),

    addAuthorWidget: (id) => patch(buildPath({ params: { author_id: id } })),
    removeAuthorWidget: () => patch(buildPath({ params: { author_id: null } })),
    addBookWidget: (id) => patch(buildPath({ params: { book_id: id } })),

    openNewAuthorModal: () => showModal(NEW_AUTHOR_HASH),
    openEditAuthorModal: () => showModal(EDIT_AUTHOR_HASH),
    openNewBookModal: () => showModal(NEW_BOOK_HASH),
    openEditBookModal: () => showModal(EDIT_BOOK_HASH),
    closeModal: () => showModal(''),
  }

  return [state, actions, paths]
}

export const connectToUrlStore = (Component) => {
  return (props) => {
    const [urlStore, urlStoreActions] = useUrlStore()
    return <Component { ...props } urlStore={ urlStore } urlStoreActions= { urlStoreActions }/>
  }
}
