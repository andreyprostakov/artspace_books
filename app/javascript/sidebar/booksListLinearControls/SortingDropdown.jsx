import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

import { selectSortBy } from 'widgets/booksListLinear/selectors'
import UrlStoreContext from 'store/urlStore/Context'

const SORT_OPTIONS = ['popularity', 'year', 'random', 'name']

const SortingDropdown = () => {
  const dispatch = useDispatch()
  const currentValue = useSelector(selectSortBy())
  const { actions: { switchToIndexSort } } = useContext(UrlStoreContext)

  return (
    <Dropdown className='list-sort-dropdown'>
      <Dropdown.Toggle variant='secondary'>
        Sort by: { currentValue }
      </Dropdown.Toggle>

      <Dropdown.Menu>
        { SORT_OPTIONS.map((value, i) =>
          <Dropdown.Item onClick={ () => switchToIndexSort(value) } disabled={ currentValue == value } key={ i }>
            { value }
          </Dropdown.Item>
        ) }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SortingDropdown
