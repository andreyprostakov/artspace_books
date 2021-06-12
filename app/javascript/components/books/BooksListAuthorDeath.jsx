import { first } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDizzy } from '@fortawesome/free-solid-svg-icons'

import { selectCurrentAuthorId, selectCurrentAuthorDetails, selectYearsReversed, selectCurrentYear } from 'store/selectors'

const BooksListAuthorBirth = () => {
  const currentId = useSelector(selectCurrentAuthorId())
  const { id, deathYear } = useSelector(selectCurrentAuthorDetails())
  const currentYear = useSelector(selectCurrentYear())
  const publishingYears = useSelector(selectYearsReversed())

  const show = (id == currentId) && deathYear && (!currentYear || (currentYear == first(publishingYears)))
  if (!show) { return null }

  return (
    <div className='list-year row death-year'>
      <div className='year-number'>
        <div className='death-icon'>
          <FontAwesomeIcon icon={ faDizzy }/>
        </div>
        <span>{ deathYear }</span>
      </div>
    </div>
  )
}

export default BooksListAuthorBirth
