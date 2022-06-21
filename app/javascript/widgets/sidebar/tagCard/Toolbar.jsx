import React, { useContext, useEffect } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import UrlStoreContext from 'store/urlStore/Context'

const Toolbar = (props) => {
  const { tagIndexEntry } = props
  const { actions: { goto }, routes: { tagPagePath, editTagPath }, getRoutes, routesReady } = useContext(UrlStoreContext)

  if (!tagIndexEntry) return null
  if (!routesReady) return null

  return (
    <>
      <ButtonGroup className='toolbar'>
        { tagIndexEntry.bookConnectionsCount > 0 &&
          <Button variant='outline-info' title='See all books' href={ tagPagePath(tagIndexEntry.id) }>
            <FontAwesomeIcon icon={ faBook }/> ({ tagIndexEntry.bookConnectionsCount })
          </Button>
        }

        <Button variant='outline-warning' title='Edit info' href={ editTagPath(tagIndexEntry.id) }>
          <FontAwesomeIcon icon={ faPen }/>
        </Button>

        <Button variant='outline-danger' title='Delete' onClick={ (e) => e.preventDefault() }>
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
