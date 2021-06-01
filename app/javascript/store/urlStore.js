import React, { useState , useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'

import { objectToParams } from 'utils/objectToParams'

export const useUrlStore = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const authorId = parseInt(params.authorId) || null
  const query = new URLSearchParams(location.search)
  const bookId = parseInt(query.get('book_id')) || null
  const [state, setInfo] = useState({
    bookId: bookId,
    authorId: authorId,
    newAuthorModalShown: location.hash == '#new-author',
    newAuthorModalShown: authorId && location.hash == '#edit-author'
  })

  window.PARAMS = params
  window.URL_STATE = state
  window.QUERY = query
  window.LOCATION = location

  useEffect(() => {
    if (bookId !== state.bookId) {
      setInfo({ ...state, bookId })
    }
  }, [bookId])

  useEffect(() => {
    if (authorId !== state.authorId) {
      setInfo({ ...state, authorId })
    }
  }, [authorId])

  useEffect(() => {
    setInfo({ ...state, newAuthorModalShown: location.hash == '#new-author' })
  }, [location.hash])

  useEffect(() => {
    setInfo({ ...state, editAuthorModalShown: authorId && (location.hash == '#edit-author') })
  }, [location.hash])

  const actions = {
    gotoBook: (id, options = {}) => {
      history.push(`${location.pathname}?book_id=${id}`)
    },
    gotoBooks: () => {
      history.push(`/books?${objectToParams({ book_id: bookId })}`)
    },
    gotoAuthor: (id, options = {}) => {
      history.push(`/authors/${id}?${objectToParams({ book_id: bookId })}`)
    },
    gotoNewAuthor: (id) => {
      history.push(`/authors/${id}`)
    },

    openNewAuthorModal: () => {
      history.push([location.path, location.search, '#new-author'].join(''))
    },
    closeNewAuthorModal: () => {
      history.push([location.path, location.search].join(''))
    },

    openEditAuthorModal: () => {
      history.push([location.path, location.search, '#edit-author'].join(''))
    },
    closeEditAuthorModal: () => {
      history.push([location.path, location.search].join(''))
    }
  }

  return [state, actions]
}

export const connectToUrlStore = (Component) => {
  return (props) => {
    const [urlStore, urlStoreActions] = useUrlStore()
    return <Component { ...props } urlStore={ urlStore } urlStoreActions= { urlStoreActions }/>
  }
}
