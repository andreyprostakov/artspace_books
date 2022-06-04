import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'react-bootstrap'

import {
  selectBooksTotal,
  selectPage,
  selectPerPage,
} from 'widgets/booksListLinear/selectors'
import { switchToPage } from 'widgets/booksListLinear/actions'

const BooksListPagination = () => {
  const dispatch = useDispatch()
  const totalCount = useSelector(selectBooksTotal())
  const page = useSelector(selectPage())
  const perPage = useSelector(selectPerPage())

  const lastPage = Math.ceil(totalCount / perPage)
  const gotoPageHandler = (pageNumber) => () => dispatch(switchToPage(pageNumber))

  if (perPage >= totalCount) { return null }
  return (
    <Pagination className='pagination'>
      { page > 2 &&
        <Pagination.First title={ 1 } onClick={ gotoPageHandler(1) }/>
      }
      { page > 1 &&
        <Pagination.Item title={ page - 1 } onClick={ gotoPageHandler(page - 1) }>{ page - 1 }</Pagination.Item>
      }
      <Pagination.Item active disabled>{ page }</Pagination.Item>
      { lastPage - page > 0 &&
        <Pagination.Item title={ page + 1 } onClick={ gotoPageHandler(page + 1) }>{ page + 1 }</Pagination.Item>
      }
      {  lastPage - page > 1 &&
        <Pagination.Last title={ lastPage } onClick={ gotoPageHandler(lastPage) }/>
      }
    </Pagination>
  )
}

export default BooksListPagination
