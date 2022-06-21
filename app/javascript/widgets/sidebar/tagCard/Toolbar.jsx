import React, { useContext } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import UrlStoreContext from 'store/urlStore/Context'

const Toolbar = (props) => {
  const { tagIndexEntry } = props
  const { actions: { goto, openEditTagModal }, getRoutes } = useContext(UrlStoreContext)

  return (
    <>
      <ButtonGroup className='toolbar'>
        { tagIndexEntry.bookConnectionsCount > 0 &&
          <Button variant='outline-info' title='See all books'
                  href={ getRoutes().tagPagePath(tagIndexEntry.id) }
                  onClick={ (e) => { e.preventDefault(); goto(getRoutes().tagPagePath(tagIndexEntry.id)) } }>
            <FontAwesomeIcon icon={ faBook }/> ({ tagIndexEntry.bookConnectionsCount })
          </Button>
        }

        <Button variant='outline-warning' title='Edit info'
                href={ getRoutes().editTagPath(tagIndexEntry.id) }
                onClick={ (e) => { e.preventDefault(); goto(getRoutes().editTagPath(tagIndexEntry.id)) } }>
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
