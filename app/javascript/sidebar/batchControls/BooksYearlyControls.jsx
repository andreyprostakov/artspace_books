import React from 'react'
import { useDispatch } from 'react-redux'

import { reloadBooks } from 'widgets/booksListYearly/actions'
import BatchControls from 'sidebar/batchControls/BatchControls'

const Controls = () => {
  const dispatch = useDispatch()
  return (
    <BatchControls onSuccess={ () => dispatch(reloadBooks()) }/>
  )
}

export default Controls
