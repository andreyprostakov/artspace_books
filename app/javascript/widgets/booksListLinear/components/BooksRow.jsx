import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import PopularityChart from 'widgets/booksListLinear/components/PopularityChart'
import Book from 'widgets/booksListYearly/components/Book'

const BooksRow = (props) => {
  const { ids: bookIds } = props

  return (
    <div className='books-list-row'>
      <PopularityChart bookIds={ bookIds }/>

      <div>
        { bookIds.map((bookId, i) =>
            <Book id={ bookId } key={ i } showYear={ true }/>
        ) }
      </div>
    </div>
  )
}

BooksRow.propTypes = {
  ids: PropTypes.array.isRequired,
}

export default BooksRow
