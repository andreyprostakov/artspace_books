import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const AuthorDeleteControl = () => {
  return (
    <Button variant='outline-danger' title='Delete' href='#' onClick={ (e) => e.preventDefault() }>
      <FontAwesomeIcon icon={ faTrash }/>
    </Button>
  )
}

export default AuthorDeleteControl
