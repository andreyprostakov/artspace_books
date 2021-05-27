import { last } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import { selectCurrentAuthorDetails, selectYearsReversed, selectCurrentYear } from 'store/booksListSlice'

const BooksListAuthorBirth = () => {
  const { birthYear } = useSelector(selectCurrentAuthorDetails)
  const currentYear = useSelector(selectCurrentYear)
  const publishingYears = useSelector(selectYearsReversed)

  const show = birthYear && (!currentYear || (currentYear == last(publishingYears)))
  if (!show) { return null }

  return (
    <div className='list-year row birth-year'>
      <div className='year-number col-12'>
        <div className='align-bottom'>
          <div className='ellipsis-icon-top'>
            <FontAwesomeIcon icon={ faEllipsisV }/>
          </div>
          { birthYear }
          <div className='birthday-icon'>
            <FontAwesomeIcon icon={ faBirthdayCake }/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BooksListAuthorBirth
