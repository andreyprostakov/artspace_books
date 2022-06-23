import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentTagId } from 'store/axis/selectors'
import { setPageIsLoading } from 'store/metadata/actions'
import { fetchTagsIndex } from 'store/tags/actions'
import { prepareNavRefs } from 'widgets/navbar/actions'

const Configurer = () => {
  const dispatch = useDispatch()
  const tagId = useSelector(selectCurrentTagId())

  useEffect(() => {
    dispatch(setPageIsLoading(true))
    Promise.all([
      dispatch(fetchTagsIndex()),
      dispatch(prepareNavRefs()),
    ]).then(() => {
        dispatch(setPageIsLoading(false))
    })
  }, [])

  return null
}

export default Configurer
