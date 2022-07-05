import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

import { selectCurrentBookId } from 'store/axis/selectors'
import { setCurrentBookId } from 'store/axis/actions'
import { selectPageIsLoading } from 'store/metadata/selectors'
import { selectRequestedBookId } from 'widgets/booksListYearly/selectors'
import { setRequestedBookId } from 'widgets/booksListYearly/actions'
import { assignPage, assignPerPage, assignSortBy } from 'widgets/booksListLinear/actions'
import UrlStoreContext from 'store/urlStore/Context'
import TagsPage from 'pages/tagsPage/Page'

const LocalStoreConfigurer = () => {
  const dispatch = useDispatch()
  const { pageState: { bookId, page, perPage, sortBy },
          actions: { addRoute, addUrlAction, addUrlState, patch },
          helpers: { buildRelativePath },
          routes: { indexPaginationPath },
          getActions,
        } = useContext(UrlStoreContext)
  const currentBookId = useSelector(selectCurrentBookId())
  const requestedBookId = useSelector(selectRequestedBookId())
  const pageLoading = useSelector(selectPageIsLoading())
  const [storeReady, setStoreReady] = useState(false)

  useEffect(() => {
    addRoute('indexPaginationPath', (page, perPage) => buildRelativePath({ params: { page, per_page: perPage } }))

    addUrlAction('showBooksIndexEntry', (id) => getActions().patch(buildRelativePath({ params: { 'book_id': id } })))

    addUrlAction('switchToIndexPage', (page, perPage) => patch(indexPaginationPath(page, perPage)))

    addUrlAction('switchToIndexSort', (sortBy) => patch(buildRelativePath({ params: { page: 1, sort_by: sortBy } })))

    addUrlState('bookId', (url) => parseInt(url.queryParameter('book_id')))

    addUrlState('page', (url) => parseInt(url.queryParameter('page')) || null)

    addUrlState('perPage', (url) => parseInt(url.queryParameter('per_page')) || null)

    addUrlState('sortBy', (url) => url.queryParameter('sort_by'))
  }, [])

  useEffect(() => {
    if (!storeReady || pageLoading || !requestedBookId) return

    dispatch(setRequestedBookId(null))
    if (requestedBookId !== bookId)
      getActions().showBooksIndexEntry(requestedBookId)
  }, [storeReady, pageLoading, requestedBookId])

  useEffect(() => {
    dispatch(assignPage(page))
    dispatch(assignPerPage(perPage))
    dispatch(assignSortBy(sortBy))
    dispatch(setCurrentBookId(bookId))

    setStoreReady(true)
  }, [bookId, page, perPage, sortBy])

  return null
}

export default LocalStoreConfigurer
