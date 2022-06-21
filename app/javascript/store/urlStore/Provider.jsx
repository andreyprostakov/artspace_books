import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { objectToParams } from 'utils/objectToParams'
import Context from 'store/urlStore/Context'

class UrlAccessor {
  constructor({ location }) {
    this.location = location
    this.query = new URLSearchParams(location.search)
    this.hash = location.hash
  }

  queryParameter(name) {
    return this.query.get(name)
  }
}

const Provider = (props) => {
  const { children } = props
  const history = useHistory()

  const location = useLocation()
  const locationRef = useRef()
  locationRef.current = location

  const [urlActions, setUrlActions] = useState({})

  const [pageState, setPageState] = useState({})
  const [stateDefiners, setStateDefiners] = useState([])
  window.PAGE_STATE = pageState

  const [routes, setRoutes] = useState({})
  const routesRef = useRef(routes)
  routesRef.current = routes

  const query = new URLSearchParams(location.search)
  const urlAccessor = new UrlAccessor({ location })

  const buildPath = ({ path, params, initialParams = '', hash } = {}) => {
    const newPath = [
      path,
      objectToParams(params ?? {}, initialParams),
      hash,
    ].join('')
    return newPath
  }

  const buildRelativePath = ({ path, params, hash } = {}) => {
    const location = locationRef.current
    return buildPath({
      path: path ?? location.pathname,
      params: params,
      initialParams: location.search,
      hash: hash ?? location.hash
    })
  }

  const contextValue = {
    pageState: pageState,
    actions: {
      ...urlActions,
      addRoute: (name, builder) => setRoutes(value => {
        return { ...value, [name]: builder }
      }),
      addUrlAction: (name, action) => setUrlActions(value => {
        return { ...value, [name]: action }
      }),
      addUrlState: definer => setStateDefiners(value => {
        return [...value, definer]
      }),
      goto: path => history.push(path),
      patch: path => history.replace(path),
    },
    helpers: {
      buildPath,
      buildRelativePath,
    },
    getRoutes: () => routesRef.current,
  }

  const updatePageState = () => {
    let newPageState = stateDefiners.reduce((newState, definer) => {
      return { ...newState, ...definer(urlAccessor) }
    }, {})
    setPageState(newPageState)
  }

  useEffect(() => {
    updatePageState()
  }, [location.pathname, location.search, location.hash, stateDefiners])

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  )
}

export default Provider
