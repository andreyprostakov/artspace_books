import React from 'react'
import { useDispatch } from 'react-redux'

import { fetchBooks } from 'widgets/booksListLinear/actions'
import BatchControls from 'sidebar/batchControls/BatchControls'

const Controls = () => {
  const dispatch = useDispatch()
  return (
    <BatchControls onSuccess={ () => dispatch(fetchBooks()) }/>
  )
}

export default Controls
