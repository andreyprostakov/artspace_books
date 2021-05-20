import React from 'react'
import PropTypes from 'prop-types'

class BooksListItem extends React.Component {
  searchUrl () {
    return 'http://google.com/search?q=goodreads'
  }

  render () {
    return (
      <div className='book-case'>
        <div className='book-cover' style={ { backgroundImage: 'url(\'' + this.props.coverUrl + '\')' } }>
          <div className='book-actions'>
          <a href='#'>Edit</a>
          <a href={ this.searchUrl() } target='_blank'>Search..</a>
          </div>
        </div>

        <a href='#' className='book-author'>AUTHOR NAME</a>

        <div className='book-title'>
          { this.props.bookUrl
            ? <a href={ this.props.bookUrl }>{ this.props.title }</a>
            : this.props.title
          }
        </div>
      </div>
    );
  }
}

BooksListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  coverUrl: PropTypes.string,
  bookUrl: PropTypes.string
};

export default BooksListItem
