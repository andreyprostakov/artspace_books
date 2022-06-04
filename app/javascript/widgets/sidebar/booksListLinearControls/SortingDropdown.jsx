import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

import { selectSortBy } from 'widgets/booksListLinear/selectors'
import { switchToSortType } from 'widgets/booksListLinear/actions'

const SORT_OPTIONS = ['popularity', 'year', 'random', 'name']

const SortingDropdown = () => {
  const dispatch = useDispatch()
  const currentValue = useSelector(selectSortBy())

  return (
    <Dropdown id='sorting_dropdown'>
      <Dropdown.Toggle variant='secondary'>
        Sort by: { currentValue }
      </Dropdown.Toggle>

      <Dropdown.Menu>
        { SORT_OPTIONS.map((value, i) =>
          <Dropdown.Item onClick={ () => dispatch(switchToSortType(value)) } disabled={ currentValue == value } key={ i }>
            { value }
          </Dropdown.Item>
        ) }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SortingDropdown
