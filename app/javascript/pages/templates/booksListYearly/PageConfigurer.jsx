import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId } from 'store/axis/selectors'
import { setSeed } from 'store/axis/actions'
import { fetchAuthorsRefs } from 'store/authors/actions'
import { fetchAllTags, setPageIsLoading } from 'store/metadata/actions'
import {
  clearListState,
  fetchYears,
  reloadBook,
  setFilters,
  setupBooksListSelection,
} from 'widgets/booksListYearly/actions'

import ListUrlStore from 'widgets/booksListYearly/components/UrlStore'

const Configurer = (props) => {
  const listFilter = props.listFilter || {}
  const dispatch = useDispatch()
  const bookId = useSelector(selectCurrentBookId())

  useEffect(() => {
    dispatch(setPageIsLoading(true))
    dispatch(clearListState())
    dispatch(setSeed())
    if (listFilter) dispatch(setFilters(listFilter))

    Promise.all([
      dispatch(fetchAllTags()),
      dispatch(fetchAuthorsRefs()),
      dispatch(fetchYears(listFilter)),
    ]).then(() =>
      dispatch(setupBooksListSelection())
    ).then(() =>
      dispatch(setPageIsLoading(false))
    )
  }, [])

  return <ListUrlStore/>
}

Configurer.propTypes = {
  listFilter: PropTypes.object,
}

export default Configurer
