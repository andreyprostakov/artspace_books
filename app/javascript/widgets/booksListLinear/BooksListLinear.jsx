import { max, min } from 'lodash'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId } from 'store/axis/selectors'
import { selectBookIds } from 'widgets/booksListLinear/selectors'
import { pickNearEntries } from 'utils/pickNearEntries'

import BooksRow from 'widgets/booksListLinear/components/BooksRow'
import HotKeysWrap from 'widgets/booksListLinear/components/HotKeysWrap'
import LocalUrlStoreConfigurer from 'widgets/booksListLinear/UrlStore'
import WidgetConfigurer from 'widgets/booksListLinear/WidgetConfigurer'
import ListInlinePageControl from 'widgets/booksListLinear/components/ListInlinePageControl'

const buildBookRowConfigs = (bookIds) => {
  const rowLength = 4
  const rowsCount = Math.ceil(bookIds.length / rowLength)
  return [...Array(rowsCount).keys()].map(i => bookIds.slice(rowLength * i, rowLength * (i + 1)))
}

const BooksListLinear = () => {
  const dispatch = useDispatch()
  const bookIds = useSelector(selectBookIds())
  const rows = buildBookRowConfigs(bookIds)

  return (
    <>
      <LocalUrlStoreConfigurer/>
      <WidgetConfigurer/>
      <HotKeysWrap>
        <div className='books-list-linear'>
          <div className='books-list-shadow shadow-top'/>
          <div className='books-list-shadow shadow-bottom'/>
          <div className='books-list-shadow shadow-left'/>
          <div className='books-list-shadow shadow-right'/>

          <div className='books-list-layer2'>
            <div className='books-list-layer3'>
              <ListInlinePageControl shift={ -1 }/>
              { rows.map((booksRowIds, i) =>
                <BooksRow ids={ booksRowIds } key={ i }/>
              ) }
              <ListInlinePageControl shift={ +1 }/>
            </div>
          </div>
        </div>
      </HotKeysWrap>
    </>
  )
}

export default BooksListLinear
