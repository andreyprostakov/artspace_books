import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import PopularityChart from 'widgets/booksListLinear/components/PopularityChart'
import Book from 'widgets/booksList/components/Book'

const BooksRow = (props) => {
  const { ids: bookIds } = props

  return (
    <div className='list-year'>
      <PopularityChart bookIds={ bookIds }/>

      <div className='year-books'>
        { bookIds.map((bookId, i) =>
            <Book id={ bookId } key={ i }/>
        ) }
      </div>
    </div>
  )
}

BooksRow.propTypes = {
  ids: PropTypes.array.isRequired,
}

export default BooksRow
