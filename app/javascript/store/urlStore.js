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

export const useUrlStore = (calculatePageState = null) => {
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
  const { ...pageState } = calculatePageState ? calculatePageState(params, query) : {}

  const calculateState = () => ({
    bookId,
    newAuthorModalShown: hash == NEW_AUTHOR_HASH,
    editAuthorModalShown: !!authorId && (hash == EDIT_AUTHOR_HASH),
    newBookModalShown: hash == NEW_BOOK_HASH,
    editBookModalShown: bookId && (hash == EDIT_BOOK_HASH),
    ...pageState,
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
  }, [bookId, location.hash, ...Object.values(pageState)])

  const actions = {
    goto,
    patch,
    buildPath,
    showModal,

    gotoBook: (id) => goto(paths.booksPath({ bookId: id })),
    gotoBooks: () => goto(paths.booksPath()),
    gotoAuthorBooks: (id) => goto(paths.authorBooksPath(id)),
    gotoAuthors: () => goto(paths.authorsPath()),
    gotoTagBooks: (id) => goto(paths.tagBooksPath(id)),
    gotoTags: () => goto(paths.tagsPath()),

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
