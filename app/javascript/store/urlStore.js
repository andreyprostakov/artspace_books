import { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'

import wrapBookId from 'store/urlStore/bookSelection'
import { objectToParams } from 'utils/objectToParams'

const absolutePaths = {
  booksPath: ({ bookId } = {}) => `/books${ objectToParams({ 'book_id': bookId }) }`,
}

const navActions = (baseActions, paths) => {
  const { buildPath, goto, patch } = baseActions
  return {
    gotoBooks: (options = {}) => goto(paths.booksPath(options)),
    showModal: hash => patch(buildPath({ hash })),
    closeModal: () => patch(buildPath({ hash: '' })),
  }
}

const buildPathFunction = location => ({ path, params, hash } = {}) =>
  [
    path ?? location.pathname,
    objectToParams(params ?? {}, location.search),
    hash ?? location.hash
  ].join('')

const useUrlStore = (calculatePageState = null) => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const query = new URLSearchParams(location.search)

  const calculatedState = calculatePageState ? calculatePageState(params, query, location) : {}
  const [state, setState] = useState(calculatedState)

  useEffect(() => {
    setState(calculatedState)
  }, [location.hash, ...Object.values(calculatedState)])

  const baseActions = {
    goto: path => history.push(path),
    patch: path => history.replace(path),
    buildPath: buildPathFunction(location),
  }

  return [
    state,
    {
      ...baseActions,
      ...navActions(baseActions, absolutePaths),
    },
    absolutePaths,
  ]
}

const wrappersSorted = [wrapBookId]

const wrappedUrlStore = wrappersSorted.reduce((storeFunc, wrapperFunc) => wrapperFunc(storeFunc), useUrlStore)

export default wrappedUrlStore
