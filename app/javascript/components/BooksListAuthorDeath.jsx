import { first } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDizzy, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import { selectCurrentAuthorDetails, selectYearsReversed, selectCurrentYear } from 'store/booksListSlice'

const BooksListAuthorBirth = () => {
  const { deathYear } = useSelector(selectCurrentAuthorDetails)
  console.log(`DEATH YEAR: ${deathYear}`)
  const currentYear = useSelector(selectCurrentYear)
  console.log(`CURRENT YEAR: ${currentYear}`)
  const publishingYears = useSelector(selectYearsReversed)
  console.log(`PUBLISHING YEARS`)
  console.log(publishingYears)

  const show = deathYear && (!currentYear || (currentYear == first(publishingYears)))
  if (!show) { return null }

  return (
    <div className='list-year row death-year'>
      <div className='year-number col-12'>
        <div className='align-bottom'>
          { deathYear }
          <div className='death-icon'>
            <FontAwesomeIcon icon={ faDizzy }/>
          </div>
          <div className='ellipsis-icon-bottom'>
            <FontAwesomeIcon icon={ faEllipsisV }/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BooksListAuthorBirth
