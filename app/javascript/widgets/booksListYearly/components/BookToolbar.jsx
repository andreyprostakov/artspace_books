import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPen, faSync, faTrash, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkEmpty, faCalendarAlt, faCheckSquare, faSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faGoodreadsG } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

import {
  selectTagBookmark,
  selectTagRead,
  selectTagNames,
} from 'store/tags/selectors'

import {
  selectBookIsSelected,
} from 'widgets/booksListYearly/selectors'
import {
  addBookIdToSelected,
  addTagToBook,
  removeBookIdFromSelected,
  removeTagFromBook,
} from 'widgets/booksListYearly/actions'
import { selectBookIdsInProcessing } from 'store/bookSync/selectors'
import { syncBookStats } from 'store/bookSync/actions'

import useUrlStore from 'store/urlStore'

const BookToolbar = (props) => {
  const { book } = props
  const dispatch = useDispatch()
  const [{}, { openEditBookModal }, { booksPath, editBookModalPath }] = useUrlStore()
  const bookIdsInProcess = useSelector(selectBookIdsInProcessing())
  const tagNames = useSelector(selectTagNames(book.tagIds))

  const tagBookmark = useSelector(selectTagBookmark())
  const isBookmarked = tagNames.includes(tagBookmark)
  const tagRead = useSelector(selectTagRead())
  const isRead = tagNames.includes(tagRead)
  const isSelected = useSelector(selectBookIsSelected(book.id))

  return (
    <div>
      <ButtonGroup className='book-toolbar'>
        { book.goodreadsUrl &&
          <Button variant='outline-info' title='See info...' href={ book.goodreadsUrl } target='_blank'>
            <FontAwesomeIcon icon={ faGoodreadsG }/>
          </Button>
        }

        <Button variant='outline-info' title='See what was then...' href={ booksPath({ bookId: book.id }) }>
          <FontAwesomeIcon icon={ faCalendarAlt }/>
        </Button>

        { isBookmarked ?
          <Button variant='outline-warning' title='Remove bookmark' href='#'
                  onClick={ () => dispatch(removeTagFromBook(book.id, tagBookmark)) }>
            <FontAwesomeIcon icon={ faBookmark }/>
          </Button>
          :
          <Button variant='outline-warning' title='Bookmark' href='#'
                  onClick={ () => dispatch(addTagToBook(book.id, tagBookmark)) }>
            <FontAwesomeIcon icon={ faBookmarkEmpty }/>
          </Button>
        }

        { isRead ?
            <Button variant='outline-warning' title='Mark as not read' href='#'
                    onClick={ () => dispatch(removeTagFromBook(book.id, tagRead)) }>
              <FontAwesomeIcon icon={ faUserNinja }/>
            </Button>
          :
            <Button variant='outline-warning' title='Mark as read' href='#'
                    onClick={ () => dispatch(addTagToBook(book.id, tagRead)) }>
              <FontAwesomeIcon icon={ faUser }/>
            </Button>
        }

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
                  disabled={ bookIdsInProcess.includes(book.id) }>
            <FontAwesomeIcon icon={ faSync }/>
          </Button>
        }

        { isSelected ?
            <Button variant='outline-warning' title='Unselect' href='#' onClick={ () => dispatch(removeBookIdFromSelected(book.id)) }>
              <FontAwesomeIcon icon={ faCheckSquare }/>
            </Button>
          :
            <Button variant='outline-warning' title='Select' href='#' onClick={ () => dispatch(addBookIdToSelected(book.id)) }>
              <FontAwesomeIcon icon={ faSquare }/>
            </Button>
        }

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
