import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'

import { objectToParams } from 'utils/objectToParams'
import Context from 'store/urlStore/Context'

class UrlAccessor {
  constructor({ params, query, location }) {
    this.params = params
    this.query = query
    this.location = location
    this.hash = location.hash
  }

  queryParameter(name) {
    return this.query.get(name)
  }

  buildUrl({ path, params, hash } = {}) {
    return [
      path ?? this.location.pathname,
      objectToParams(params ?? {}, this.location.search),
      hash ?? this.hash
    ].join('')
  }
}

const Provider = (props) => {
  const { children } = props
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const query = new URLSearchParams(location.search)
  const urlAccessor = new UrlAccessor({ params, query, location })

  const [urlActions, setUrlActions] = useState({})
  const [stateDefiners, setStateDefiners] = useState([])
  const [pageState, setPageState] = useState({})

  const contextValue = {
    pageState: pageState,
    actions: {
      ...urlActions,
      addUrlAction: (name, definer) => setUrlActions({ ...urlActions, [name]: definer }),
      addUrlState: definer => setStateDefiners([...stateDefiners, definer]),
      goto: path => history.push(path),
      patch: path => history.replace(path),
    },
    helpers: {
      buildPath: ({ path, params, hash } = {}) => {
        return [
          path ?? location.pathname,
          objectToParams(params ?? {}, location.search),
          hash ?? location.hash
        ].join('')
      },
    },
  }

  const updatePageState = () => {
    let newPageState = stateDefiners.reduce((newState, definer) => {
      return { ...newState, ...definer(urlAccessor) }
    }, {})
    setPageState(newPageState)
  }

  useEffect(() => {
    updatePageState()
  }, [location, stateDefiners])

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  )
}

export default Provider
