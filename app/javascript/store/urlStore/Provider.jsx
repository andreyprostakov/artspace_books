import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'

import { objectToParams } from 'utils/objectToParams'
import Context from 'store/urlStore/Context'

class UrlAccessor {
  constructor({ params, location }) {
    this.params = params
    this.location = location
    this.query = new URLSearchParams(location.search)
    this.hash = location.hash
  }

  queryParameter(name) {
    return this.query.get(name)
  }

  buildPath({ locationOverride, path, params, hash } = {}) {
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
  const params = useParams()

  const location = useLocation()
  const locationRef = useRef()
  locationRef.current = location

  const [urlActions, setUrlActions] = useState({})
  const [pageState, setPageState] = useState({})
  const [stateDefiners, setStateDefiners] = useState([])

  const [routes, setRoutes] = useState({})
  const routesRef = useRef(routes)
  routesRef.current = routes

  const query = new URLSearchParams(location.search)
  const urlAccessor = new UrlAccessor({ params, location: location })
  const buildPath = ({ path, params, hash } = {}) => {
    const location = locationRef.current
    const newPath = [
      path ?? location.pathname,
      objectToParams(params ?? {}, location.search),
      hash ?? location.hash
    ].join('')
    return newPath
  }

  const contextValue = {
    pageState: pageState,
    actions: {
      ...urlActions,
      addRoute: (name, pieces) => setRoutes(value => {
        return { ...value, [name]: (...args) => buildPath(pieces(...args)) }
      }),
      addUrlAction: (name, builder) => setUrlActions(value => {
        return { ...value, [name]: (...args) => builder(routesRef.current)(...args) }
      }),
      addUrlState: definer => setStateDefiners(value => {
        return [...value, definer]
      }),
      goto: path => history.push(path),
      patch: path => history.replace(path),
    },
    routes: routesRef,
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
