import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookmark, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

import { useUrlStore } from 'store/urlStore'

const Toolbar = (props) => {
  const { author } = props
  const [{},
         { gotoAuthorBooks, openEditAuthorModal, openNewBookModal },
         { editAuthorModalPath, authorBooksPath, newBookModalPath }] = useUrlStore()
  return (
    <>
      <ButtonGroup className='author-toolbar'>
        { author.reference &&
          <Button variant='outline-info' title='See info...' href={ author.reference } target='_blank'>
            <FontAwesomeIcon icon={ faWikipediaW }/>
          </Button>
        }

        { author.booksCount > 0 &&
          <Button variant='outline-info' title='See all books'
                  href={ authorBooksPath(author.id) }
                  onClick={ (e) => { e.preventDefault(); gotoAuthorBooks(author.id) } }>
            <FontAwesomeIcon icon={ faBook }/> ({author.booksCount})
          </Button>
        }
      </ButtonGroup>

      <ButtonGroup className='author-toolbar'>
        <Button variant='outline-warning' title='Edit info'
                href={ editAuthorModalPath(author.id) }
                onClick={ (e) => { e.preventDefault(); openEditAuthorModal() } }>
          <FontAwesomeIcon icon={ faPen }/>
        </Button>

        <Button variant='outline-warning' title='Bookmark' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faBookmarkEmpty }/>
        </Button>

        <Button variant='outline-danger' title='Delete' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faTrash }/>
        </Button>

        <Button variant='outline-warning' title='Add a book'
                href={ newBookModalPath() }
                onClick={ (e) => { e.preventDefault(); openNewBookModal() } }>
          + <FontAwesomeIcon icon={ faBook }/>
        </Button>
      </ButtonGroup>
    </>
  )
}

Toolbar.propTypes = {
  author: PropTypes.object.isRequired,
}

export default Toolbar
