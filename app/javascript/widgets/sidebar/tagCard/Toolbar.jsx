import React, { useContext } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import UrlStoreContext from 'store/urlStore/Context'

const Toolbar = (props) => {
  const { tagFull } = props
  const { actions: { openEditTagModal },
          routes,
        } = useContext(UrlStoreContext)
  const { editTagPath } = routes.current

  return (
    <>
      <ButtonGroup className='author-toolbar'>
        {
          <Button variant='outline-info' title='See all books'
                  href={ editTagPath(tagFull.id) }
                  onClick={ (e) => { e.preventDefault(); gotoAuthorBooks(tagFull.id) } }>
            <FontAwesomeIcon icon={ faBook }/> ({ tagFull.bookConnectionsCount })
          </Button>
        }

        <Button variant='outline-warning' title='Edit info'
                href={ editTagPath(tagFull.id) }
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
  tagFull: PropTypes.object.isRequired,
}

export default Toolbar
