import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faBookReader, faEdit, faSync } from '@fortawesome/free-solid-svg-icons'
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
    <>
      <ButtonGroup className='book-toolbar'>
        { book.goodreadsUrl &&
          <Button variant='outline-info' title='See info...' href={ book.goodreadsUrl } target='_blank'>
            <FontAwesomeIcon icon={ faGoodreadsG }/>
          </Button>
        }

        <Button variant='outline-warning' title='Edit info'
                href={ editBookModalPath(book.id) }
                onClick={ (e) => { e.preventDefault(); openEditBookModal() } }>
          <FontAwesomeIcon icon={ faEdit }/>
        </Button>

        <Button variant='outline-warning' title='Bookmark' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faBookmark }/>
        </Button>

        <Button variant='outline-warning' title='Mark as read' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faBookReader }/>
        </Button>

        { book.goodreadsUrl &&
          <Button variant='outline-warning' title='Sync latest ratings' href='#'
                  onClick={ () => dispatch(syncBookStats(book.id)) }
                  className={ { disabled: !!syncedBookId } }>
            <FontAwesomeIcon icon={ faSync }/>
          </Button>
        }
      </ButtonGroup>
    </>
  )
}

BookToolbar.propTypes = {
  book: PropTypes.object.isRequired,
}

export default BookToolbar
