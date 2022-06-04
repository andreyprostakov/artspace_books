import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

import {
  selectBooksTotal,
  selectPage,
  selectPerPage,
} from 'widgets/booksListLinear/selectors'

import Pagination from 'widgets/sidebar/booksListLinearControls/Pagination'
import SortingDropdown from 'widgets/sidebar/booksListLinearControls/SortingDropdown'

const BooksListControls = () => {
  const totalCount = useSelector(selectBooksTotal())
  const page = useSelector(selectPage())
  const perPage = useSelector(selectPerPage())

  return (
    <Card id='sidebar_books_list_controls' className='sidebar-card-widget'>
      <Card.Header className='widget-title'>Books: { totalCount }</Card.Header>
      <Card.Body>
        <Pagination/>
        <SortingDropdown/>
      </Card.Body>
    </Card>
  )
}

export default BooksListControls
