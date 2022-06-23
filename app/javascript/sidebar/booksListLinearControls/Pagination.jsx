import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'react-bootstrap'

import {
  selectBooksTotal,
  selectPage,
  selectPerPage,
} from 'widgets/booksListLinear/selectors'
import UrlStoreContext from 'store/urlStore/Context'

const BooksListPagination = () => {
  const dispatch = useDispatch()
  const totalCount = useSelector(selectBooksTotal())
  const page = useSelector(selectPage())
  const perPage = useSelector(selectPerPage())

  const lastPage = Math.ceil(totalCount / perPage)
  const { actions: { switchToIndexPage }, routes: { indexPaginationPath }, routesReady } = useContext(UrlStoreContext)
  const gotoPageHandler = (pageNumber) => () => switchToIndexPage(pageNumber, perPage)

  if (perPage >= totalCount) return null
  if (!routesReady) return null

  const renderPageLink = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > lastPage) return null
    return (
      <Pagination.Item title={ pageNumber } href={ indexPaginationPath(pageNumber, perPage) }
                       onClick={ (e) => { e.preventDefault(); switchToIndexPage(pageNumber, perPage) } }>
        { pageNumber }
      </Pagination.Item>
    )
  }
  return (
    <Pagination className='pagination'>
      { page > 2 && renderPageLink(1) }
      { renderPageLink(page - 1) }
      <Pagination.Item active disabled>{ page }</Pagination.Item>
      { renderPageLink(page + 1) }
      { lastPage - page > 1 && renderPageLink(lastPage) }
    </Pagination>
  )
}

export default BooksListPagination
