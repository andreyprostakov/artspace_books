import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

import {
  selectBooksTotal,
  selectPage,
  selectPerPage,
} from 'widgets/booksListLinear/selectors'

import Pagination from 'sidebar/booksListLinearControls/Pagination'
import SortingDropdown from 'sidebar/booksListLinearControls/SortingDropdown'

const BooksListControls = () => {
  const totalCount = useSelector(selectBooksTotal())
  const page = useSelector(selectPage())
  const perPage = useSelector(selectPerPage())

  return (
    <Card className='sidebar-books-list-linear-controls-widget sidebar-card-widget'>
      <Card.Header className='widget-title'>Books: { totalCount }</Card.Header>
      <Card.Body>
        <SortingDropdown/>
        <Pagination/>
      </Card.Body>

      <div className='widget-header-arrow-triangle-right'/>
      <div className='widget-arrow-triangle-down'/>
    </Card>
  )
}

export default BooksListControls
