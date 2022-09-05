import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import UrlStoreContext from 'store/urlStore/Context'

const AuthorInfoLink = (props) => {
  const { booksCount, id } = props
  const { routes: { authorPagePath }, routesReady } = useContext(UrlStoreContext)

  if (!routesReady) return null

  return (
    <Button variant='outline-info' title='See all books' href={ authorPagePath(id) }>
      <FontAwesomeIcon icon={ faBook }/>
      { Boolean(booksCount) &&
        <> ({ booksCount })</>
      }
    </Button>
  )
}

AuthorInfoLink.propTypes = {
  booksCount: PropTypes.number,
  id: PropTypes.number.isRequired,
}

export default AuthorInfoLink
