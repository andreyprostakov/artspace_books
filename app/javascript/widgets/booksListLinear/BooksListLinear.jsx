import { max, min } from 'lodash'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId } from 'store/axis/selectors'
import { fetchBooks } from 'widgets/booksListLinear/actions'
import { selectBookIds } from 'widgets/booksListLinear/selectors'
import { pickNearEntries } from 'utils/pickNearEntries'

import BooksRow from 'widgets/booksListLinear/components/BooksRow'
import HotKeysWrap from 'widgets/booksListLinear/components/HotKeysWrap'

const pickXNullable = (list, start, count) => {
  return [...Array(count).keys()].map(i => {
    i += start
    if (i < 0) return null
    if (i >= list.length) return null
    return list[i]
  })
}

const buildBookRowConfigs = (bookIds, currentId) => {
  const rowLength = 5
  const currentIndex = bookIds.indexOf(currentId) || 0
  const topRowStart = currentIndex - 2

  return [
    pickXNullable(bookIds, topRowStart - rowLength, rowLength),
    pickXNullable(bookIds, topRowStart, rowLength),
    pickXNullable(bookIds, topRowStart + rowLength, rowLength),
    pickXNullable(bookIds, topRowStart + rowLength*2, rowLength),
  ]
}

const BooksListLinear = () => {
  const dispatch = useDispatch()
  const bookIds = useSelector(selectBookIds())
  const currentBookId = useSelector(selectCurrentBookId())

  const displayedBookIds = pickNearEntries(bookIds, currentBookId, { lengthBefore: 3, lengthAfter: 3 })
  const rows = buildBookRowConfigs(bookIds, currentBookId)

  console.log(bookIds)
  console.log(currentBookId)
  console.log(rows)
  return (
    <HotKeysWrap>
      <div className='books-list'>
        <div className='books-list-shadow shadow-top'/>
        <div className='books-list-shadow shadow-bottom'/>
        <div className='books-list-shadow shadow-left'/>
        <div className='books-list-shadow shadow-right'/>

        <div className='books-list-layer2'>
          <div className='books-list-layer3'>
            { rows.map((booksRowIds, i) =>
              <BooksRow ids={ booksRowIds } key={ i }/>
            ) }
          </div>
        </div>
      </div>
    </HotKeysWrap>
  )
}

export default BooksListLinear
