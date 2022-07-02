import { isEmpty } from 'lodash'
import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { setSeed } from 'store/axis/actions'
import { setPageIsLoading } from 'store/metadata/actions'
import {
  clearListState,
  fetchYears,
  setFilters,
  setupBooksListSelection,
} from 'widgets/booksListYearly/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'
import UrlStoreContext from 'store/urlStore/Context'

const Configurer = (props) => {
  const listFilter = props.listFilter || {}
  const dispatch = useDispatch()
  const { routesReady } = useContext(UrlStoreContext)

  useEffect(() => {
    if (!routesReady) return
    dispatch(setPageIsLoading(true))
    dispatch(clearListState())
    dispatch(setSeed())
    if (!isEmpty(listFilter)) dispatch(setFilters(listFilter))

    Promise.all([
      dispatch(prepareNavRefs()),
      dispatch(fetchYears(listFilter)),
    ]).then(() =>
      dispatch(setupBooksListSelection())
    ).then(() =>
      dispatch(setPageIsLoading(false))
    )
  }, [routesReady])

  return null
}

Configurer.propTypes = {
  listFilter: PropTypes.object,
}

export default Configurer
