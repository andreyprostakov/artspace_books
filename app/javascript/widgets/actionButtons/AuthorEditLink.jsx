import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import UrlStoreContext from 'store/urlStore/Context'

const AuthorEditLink = (props) => {
  const { id } = props
  const { routes: { editAuthorPath },
          actions: { openEditAuthorModal }, routesReady } = useContext(UrlStoreContext)

  if (!routesReady) return null

  return (
  <Button variant='outline-warning' title='Edit info' href={ editAuthorPath(id) }
          onClick={ e => { e.preventDefault(); openEditAuthorModal() } }>
    <FontAwesomeIcon icon={ faPen }/>
  </Button>
  )
}

AuthorEditLink.propTypes = {
  id: PropTypes.number.isRequired,
}

export default AuthorEditLink
