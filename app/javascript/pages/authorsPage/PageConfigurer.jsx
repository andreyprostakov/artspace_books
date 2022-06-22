import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setPageIsLoading } from 'store/metadata/actions'
import { fetchAuthorsIndex } from 'store/authors/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'

const Configurer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageIsLoading(true))
    Promise.all([
      dispatch(fetchAuthorsIndex()),
      dispatch(prepareNavRefs()),
    ]).then(() => {
        dispatch(setPageIsLoading(false))
    })
  }, [])

  return null
}

export default Configurer
