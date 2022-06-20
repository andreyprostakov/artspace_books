import React, { useContext } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import UrlStoreContext from 'store/urlStore/Context'

const Toolbar = (props) => {
  const { tagIndexEntry } = props
  const { actions: { openEditTagModal }, routes } = useContext(UrlStoreContext)
  const { editTagPath } = routes.current

  return (
    <>
      <ButtonGroup className='toolbar'>
        { tagIndexEntry.bookConnectionsCount > 0 &&
          <Button variant='outline-info' title='See all books'
                  href={ editTagPath(tagIndexEntry.id) }
                  onClick={ (e) => { e.preventDefault(); gotoAuthorBooks(tagIndexEntry.id) } }>
            <FontAwesomeIcon icon={ faBook }/> ({ tagIndexEntry.bookConnectionsCount })
          </Button>
        }

        <Button variant='outline-warning' title='Edit info'
                href={ editTagPath(tagIndexEntry.id) }
                onClick={ (e) => { e.preventDefault(); openEditTagModal() } }>
          <FontAwesomeIcon icon={ faPen }/>
        </Button>

        <Button variant='outline-danger' title='Delete' href='#' onClick={ (e) => e.preventDefault() }>
          <FontAwesomeIcon icon={ faTrash }/>
        </Button>
      </ButtonGroup>
    </>
  )
}

Toolbar.propTypes = {
  tagIndexEntry: PropTypes.object.isRequired,
}

export default Toolbar
