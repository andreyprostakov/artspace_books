import { isEmpty } from 'lodash'
import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId } from 'store/axis/selectors'
import { selectCurrentBookRef } from 'store/books/selectors'
import { setSeed } from 'store/axis/actions'
import { setPageIsLoading } from 'store/metadata/actions'
import {
  clearListState,
  fetchYears,
  requestBookIndexNeighboursLoaded,
  setBookAsCurrentInYear,
  setFilters,
  setRequestedBookId,
  setupBooksListSelection,
} from 'widgets/booksListYearly/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'
import UrlStoreContext from 'store/urlStore/Context'

const Configurer = (props) => {
  const listFilter = props.listFilter || {}
  const dispatch = useDispatch()
  const { routesReady } = useContext(UrlStoreContext)
  const currentBookId = useSelector(selectCurrentBookId())
  const currentBookRef = useSelector(selectCurrentBookRef())

  useEffect(() => {
    if (!routesReady) return
    console.log('Yearly/Configurer.useEffect sets pageIsLoading to TRUE')
    dispatch(setPageIsLoading(true))
    dispatch(setRequestedBookId(null))
    dispatch(clearListState())
    dispatch(setSeed())
    if (!isEmpty(listFilter)) dispatch(setFilters(listFilter))

    Promise.all([
      dispatch(prepareNavRefs()),
      dispatch(fetchYears(listFilter)),
    ]).then(() =>
      dispatch(setupBooksListSelection())
    ).then(() => {
      console.log('Yearly/Configurer.useEffect sets pageIsLoading to FALSE')
      dispatch(setPageIsLoading(false))
    })
  }, [routesReady])

  useEffect(() => {
    if (!routesReady || !currentBookRef) return
    dispatch(requestBookIndexNeighboursLoaded())
    dispatch(setBookAsCurrentInYear(currentBookRef))
  }, [routesReady, currentBookRef])

  useEffect(() => {
    if (!routesReady) return
    if (!currentBookId) {
      dispatch(setSeed())
      dispatch(setupBooksListSelection())
    }
  }, [routesReady, currentBookId])

  return null
}

Configurer.propTypes = {
  listFilter: PropTypes.object,
}

export default Configurer
