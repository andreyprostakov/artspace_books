import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

import { selectCurrentBookId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import { selectPageIsLoading } from 'store/metadata/selectors'
import { selectRequestedBookId } from 'widgets/booksListYearly/selectors'
import { setRequestedBookId } from 'widgets/booksListYearly/actions'
import UrlStoreContext from 'store/urlStore/Context'
import TagsPage from 'pages/tagsPage/Page'

const LocalStoreConfigurer = () => {
  const dispatch = useDispatch()
  const { pageState: { bookId },
          actions: { addUrlAction, addUrlState },
          helpers: { buildRelativePath },
          getActions,
          routesReady,
        } = useContext(UrlStoreContext)
  const currentBookId = useSelector(selectCurrentBookId())
  const requestedBookId = useSelector(selectRequestedBookId())
  const pageLoading = useSelector(selectPageIsLoading())
  const [storeReady, setStoreReady] = useState(false)

  useEffect(() => {
    addUrlAction('showBooksIndexEntry', (id) =>
      getActions().patch(buildRelativePath({ params: { 'book_id': id } }))
    )

    addUrlState('bookId', (url) => parseInt(url.queryParameter('book_id')))
  }, [])

  useEffect(() => {
    if (!storeReady || pageLoading || !requestedBookId) return

    dispatch(setRequestedBookId(null))
    if (requestedBookId !== bookId)
      getActions().showBooksIndexEntry(requestedBookId)
  }, [pageLoading, storeReady, requestedBookId])

  useEffect(() => {
    if (routesReady) {
      dispatch(setCurrentBookId(bookId))
    }

    setStoreReady(true)
  }, [bookId])

  return null
}

export default LocalStoreConfigurer
