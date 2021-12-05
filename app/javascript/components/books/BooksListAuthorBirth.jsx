import { last } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons'

import { selectCurrentAuthorDetails, selectYearsReversed, selectCurrentYear } from 'store/selectors'
import { selectCurrentAuthorId } from 'store/axis/selectors'

const BooksListAuthorBirth = () => {
  const currentId = useSelector(selectCurrentAuthorId())
  const { id, birthYear } = useSelector(selectCurrentAuthorDetails())
  const currentYear = useSelector(selectCurrentYear())
  const publishingYears = useSelector(selectYearsReversed())

  const show = (id == currentId) && birthYear && (!currentYear || (currentYear == last(publishingYears)))
  if (!show) { return null }

  return (
    <div className='list-year row birth-year'>
      <div className='year-number'>
        <div className='birthday-icon'>
          <FontAwesomeIcon icon={ faBirthdayCake }/>
        </div>
        <span>{ birthYear }</span>
      </div>
    </div>
  )
}

export default BooksListAuthorBirth
