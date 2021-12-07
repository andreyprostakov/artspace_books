import React from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'

import { setSortOrder } from 'store/authorsList/actions'
import orders from 'store/authorsList/sortOrders'
import usePageUrlStore from 'pages/authorsPage/usePageUrlStore'

const AuthorsListControls = () => {
  const dispatch = useDispatch()
  const [{ sortOrder }, { changeSortOrder }] = usePageUrlStore()
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
