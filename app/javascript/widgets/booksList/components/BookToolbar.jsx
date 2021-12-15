import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPen, faSync, faTrash, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkEmpty, faSquare as faSquareEmpty, faUser } from '@fortawesome/free-regular-svg-icons'
import { faGoodreadsG } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

import {
  selectSyncedBookId,
} from 'widgets/booksList/selectors'
import { syncBookStats } from 'widgets/booksList/actions'
import { useUrlStore } from 'store/urlStore'

const BookToolbar = (props) => {
  const { book } = props
  const dispatch = useDispatch()
  const [{}, { openEditBookModal }, { editBookModalPath }] = useUrlStore()
  const syncedBookId = useSelector(selectSyncedBookId())
  return (
    <div>
      <ButtonGroup className='book-toolbar'>
        { book.goodreadsUrl &&
          <Button variant='outline-info' title='See info...' href={ book.goodreadsUrl } target='_blank'>
            <FontAwesomeIcon icon={ faGoodreadsG }/>
          </Button>
        }

        <Button variant='outline-warning' title='Bookmark' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faBookmarkEmpty }/>
        </Button>

        <Button variant='outline-warning' title='Mark as read' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faUser }/>
        </Button>
      </ButtonGroup>

      <ButtonGroup className='book-toolbar'>
        <Button variant='outline-warning' title='Edit info'
                href={ editBookModalPath(book.id) }
                onClick={ (e) => { e.preventDefault(); openEditBookModal() } }>
          <FontAwesomeIcon icon={ faPen }/>
        </Button>

        { book.goodreadsUrl &&
          <Button variant='outline-warning' title='Sync latest ratings' href='#'
                  onClick={ () => dispatch(syncBookStats(book.id)) }
                  className={ { disabled: !!syncedBookId } }>
            <FontAwesomeIcon icon={ faSync }/>
          </Button>
        }

        <Button variant='outline-warning' title='Select' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faSquareEmpty }/>
        </Button>

        <Button variant='outline-danger' title='Delete' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faTrash }/>
        </Button>
      </ButtonGroup>
    </div>
  )
}

BookToolbar.propTypes = {
  book: PropTypes.object.isRequired,
}

export default BookToolbar
