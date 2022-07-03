import React from 'react'
import { Spinner } from 'react-bootstrap'

const BookPlaceholder = (props) => {
  const { id } = props
  return (
    <div className='book-case placeholder' title={ `ID=${id}` }>
      <Spinner className='placeholder-spinner' animation='border'/>
    </div>
  )
}

export default BookPlaceholder
