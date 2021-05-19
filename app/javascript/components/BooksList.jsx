import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class BooksList extends React.Component {
  render () {
    return (
      <>
        { this.props.years.map(year =>
          <span key={ year } className={ classNames({ bold: year == this.props.currentYear })}>
            { year == this.props.currentYear
              ? <b>{ year } </b>
              : <>{ year } </>
            }
          </span>
        ) }
      </>
    );
  }
}

BooksList.propTypes = {
  years: PropTypes.array,
  currentYear: PropTypes.number
};

export default BooksList
