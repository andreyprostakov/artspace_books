import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { selectBookIdsByYear, selectYearsToDisplay, fetchBooks, fetchAuthors, fetchYears, setSelection } from 'store/booksListSlice'
import BooksListItem from 'components/BooksListItem'
import NavController from 'components/NavController'
import booksLoader from 'serverApi/booksLoader'

class BooksList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    Promise.all([
      dispatch(fetchYears),
      dispatch(fetchAuthors),
      dispatch(fetchBooks)
    ]).then(() =>
      dispatch(setSelection())
    )
  }

  render () {
    const { years } = this.props
    return (
      <div className='books-list'>
        <NavController/>
        { years.map(year =>
          <BooksListYearRow year={ year } key={ year }/>
        ) }
      </div>
    )
  }
}

const BooksListYearRow = (props) => {
  const bookIds = useSelector(selectBookIdsByYear(props.year))
  return (
    <div className='list-year row'>
      <div className='year-number col-1'>
        <div className='align-bottom'>
          { props.year }
          <div className='tick-sign'/>
        </div>
      </div>

      <div className='year-books col-11'>
        { bookIds.map(bookId =>
          <BooksListItem id={ bookId } key={ bookId }/>
        ) }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    years: selectYearsToDisplay()(state)
  }
}

export default connect(mapStateToProps)(BooksList)
