import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageViewer from 'react-simple-image-viewer'

import { setImageSrc } from 'widgets/imageModal/actions'
import { selectImageSrc } from 'widgets/imageModal/selectors'

import Image from 'react-bootstrap/Image'

const ImageModal = (props) => {
  const src = useSelector(selectImageSrc())
  const dispatch = useDispatch()
  const onHide = () => dispatch(setImageSrc(null))

  if (!src) { return null }

  return (
    <ImageViewer
      src={ [src] }
      onClose={ onHide }
      closeOnClickOutside={ true }/>
  )
}

export default ImageModal
