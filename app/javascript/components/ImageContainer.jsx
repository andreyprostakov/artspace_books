import React from 'react'
import classNames from 'classnames'

const ImageContainer = (props) => {
  const { children, className, url, ...options } = props
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    ...options.styles
  }
  return (
    <div className={ classNames('image-container', className) } style={ styles } { ...options }>
      { children }
    </div>
  )
}

export default ImageContainer
