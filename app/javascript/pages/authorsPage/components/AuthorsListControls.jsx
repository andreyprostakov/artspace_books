import React, { useContext } from 'react'
import { Form } from 'react-bootstrap'

import orders from 'pages/authorsPage/sortOrders'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorsListControls = () => {
  const { pageState: { sortOrder }, actions: { changeSortOrder } } = useContext(UrlStoreContext)
  return (
    <div className='authors-list-controls'>
      <Form.Label>Sort by:</Form.Label>
      <Form.Control as='select' onChange={ (event) => changeSortOrder(event.target.value) }>
        <option value={ orders.BY_NAME_ASCENDING }>name ↓</option>
        <option value={ orders.BY_NAME_DESCENDING }>name ↑</option>
        <option value={ orders.BY_RANK_ASCENDING }>popularity ↓</option>
        <option value={ orders.BY_RANK_DESCENDING }>popularity ↑</option>
        <option value={ orders.BY_YEAR_ASCENDING }>years ↑</option>
        <option value={ orders.BY_YEAR_DESCENDING }>years ↓</option>
      </Form.Control>
    </div>
  )
}

export default AuthorsListControls
