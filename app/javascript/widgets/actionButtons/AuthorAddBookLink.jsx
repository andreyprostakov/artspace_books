import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

import UrlStoreContext from 'store/urlStore/Context'

const AuthorAddBookLink = () => {
  const { routes: { newBookPath },
          actions: { openNewBookModal }, routesReady } = useContext(UrlStoreContext)

  if (!routesReady) return null

  return (
    <Button variant='outline-warning' title='Add a book' href={ newBookPath() }
            onClick={ e => { e.preventDefault(); openNewBookModal() } }>
      + <FontAwesomeIcon icon={ faBook }/>
    </Button>
  )
}

export default AuthorAddBookLink
