import React from 'react'
import classNames from 'classnames'

const ImageContainer = (props) => {
  const { children, className, url } = props
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
  return (
    <div className={ classNames('image-container', className) } style={ styles }>
      { children }
    </div>
  )
}

export default ImageContainer
