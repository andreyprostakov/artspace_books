import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookmark, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

import { selectTagBookmark, selectTagNames } from 'store/tags/selectors'
import { markAuthorAsBookmarked, unmarkAuthorAsBookmarked } from 'widgets/sidebar/authorCard/actions'
import useUrlStore from 'store/urlStore'
import UrlStoreContext from 'store/urlStore/Context'

const Toolbar = (props) => {
  const { authorFull } = props
  const [{}, { gotoAuthorBooks }, { authorBooksPath, }] = useUrlStore()
  const { routes: { editAuthorPath, newBookPath },
          actions: { openEditAuthorModal, openNewBookModal }, routesReady } = useContext(UrlStoreContext)

  const dispatch = useDispatch()
  const tagNames = useSelector(selectTagNames(authorFull.tagIds))
  const tagBookmark = useSelector(selectTagBookmark())
  const isBookmarked = tagNames.includes(tagBookmark)

  if (!routesReady) return null

  return (
    <>
      <ButtonGroup className='author-toolbar'>
        { authorFull.reference &&
          <Button variant='outline-info' title='See info...' href={ authorFull.reference } target='_blank'>
            <FontAwesomeIcon icon={ faWikipediaW }/>
          </Button>
        }

        { authorFull.booksCount > 0 &&
          <Button variant='outline-info' title='See all books' href={ authorBooksPath(authorFull.id) }>
            <FontAwesomeIcon icon={ faBook }/> ({ authorFull.booksCount })
          </Button>
        }

        <Button variant='outline-warning' title='Edit info' href={ editAuthorPath(authorFull.id) }
                onClick={ e => { e.preventDefault(); openEditAuthorModal() } }>
          <FontAwesomeIcon icon={ faPen }/>
        </Button>

        { isBookmarked ?
          <Button variant='outline-warning' title='Remove bookmark' href='#'
                  onClick={ () => dispatch(unmarkAuthorAsBookmarked(authorFull.id, authorFull.tagIds)) }>
            <FontAwesomeIcon icon={ faBookmark }/>
          </Button>
          :
          <Button variant='outline-warning' title='Bookmark' href='#'
                  onClick={ () => dispatch(markAuthorAsBookmarked(authorFull.id, authorFull.tagIds)) }>
            <FontAwesomeIcon icon={ faBookmarkEmpty }/>
          </Button>
        }

        <Button variant='outline-danger' title='Delete' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faTrash }/>
        </Button>

        <Button variant='outline-warning' title='Add a book' href={ newBookPath() }
                onClick={ e => { e.preventDefault(); openNewBookModal() } }>
          + <FontAwesomeIcon icon={ faBook }/>
        </Button>
      </ButtonGroup>
    </>
  )
}

Toolbar.propTypes = {
  authorFull: PropTypes.object.isRequired,
}

export default Toolbar
