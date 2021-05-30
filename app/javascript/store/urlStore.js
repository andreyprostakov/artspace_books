import React, { useState , useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'

export const useUrlStore = () => {
  const [state, setInfo] = useState({})
  const query = new URLSearchParams(useLocation().search)
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    const bookId = parseInt(query.get('book_id'))
    if (bookId && bookId !== state.bookId) {
      setInfo({ bookId })
    }
  })

  const actions = {
    setCurrentBookId: (id) => history.push(`/books?book_id=${id}`)
  }

  return [state, actions]
}

export const connectToUrlStore = (Component) => {
  return (props) => {
    const [urlState, urlStateActions] = useUrlStore()
    return <Component { ...props } urlState={ urlState } urlStateActions= { urlStateActions }/>
  }
}
