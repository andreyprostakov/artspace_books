import React, { useContext } from 'react'
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

import { selectIdIsSelected } from 'store/selectables/selectors'
import { selectId, unselectId } from 'store/selectables/actions'
import { addTagToBook, removeTagFromBook } from 'widgets/booksListYearly/actions'
import { selectBookIdsInProcessing } from 'store/bookSync/selectors'
import { updateBookPopularity } from 'store/bookSync/actions'
import UrlStoreContext from 'store/urlStore/Context'

const BookToolbar = (props) => {
  const { book } = props
  const dispatch = useDispatch()
  const { routesReady,
          routes: { booksPagePath, editBookPath },
          actions: { openEditBookModal } } = useContext(UrlStoreContext)
  const bookIdsInProcess = useSelector(selectBookIdsInProcessing())
  const tagNames = useSelector(selectTagNames(book.tagIds))

  const tagBookmark = useSelector(selectTagBookmark())
  const isBookmarked = tagNames.includes(tagBookmark)
  const tagRead = useSelector(selectTagRead())
  const isRead = tagNames.includes(tagRead)
  const isSelectedForBatch = useSelector(selectIdIsSelected(book.id))

  if (!routesReady) return null

  return (
    <div>
      <ButtonGroup className='book-toolbar'>
        { book.goodreadsUrl &&
          <Button variant='outline-info' title='See info...' href={ book.goodreadsUrl } target='_blank'>
            <FontAwesomeIcon icon={ faGoodreadsG }/>
          </Button>
        }

        <Button variant='outline-info' title='See what was then...' href={ booksPagePath({ bookId: book.id }) }>
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
        <Button variant='outline-warning' title='Edit info' href={ editBookPath(book.id) }
                onClick={ e => { e.preventDefault(); openEditBookModal() } }>
          <FontAwesomeIcon icon={ faPen }/>
        </Button>

        { book.goodreadsUrl &&
          <Button variant='outline-warning' title='Sync latest ratings' href='#'
                  onClick={ () => dispatch(updateBookPopularity(book.id)) }
                  disabled={ bookIdsInProcess.includes(book.id) }>
            <FontAwesomeIcon icon={ faSync }/>
          </Button>
        }

        { isSelectedForBatch ?
            <Button variant='outline-warning' title='Unselect' href='#' onClick={ () => dispatch(unselectId(book.id)) }>
              <FontAwesomeIcon icon={ faCheckSquare }/>
            </Button>
          :
            <Button variant='outline-warning' title='Select' href='#' onClick={ () => dispatch(selectId(book.id)) }>
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
