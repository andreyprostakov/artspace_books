import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import keydown, { Keys } from 'react-keydown'
import { shiftYear, shiftBookSelection, setBookModalShown } from 'store/booksListSlice'

window.Keys = Keys

@keydown()
class NavController extends React.Component {
  @keydown(Keys.DOWN)
  handleKeyPressDown(event) {
    event.preventDefault()
    this.down()
  }

  @keydown(Keys.UP)
  handleKeyPressUp(event) {
    event.preventDefault()
    this.up()
  }

  @keydown(Keys.LEFT)
  handleKeyPressLeft(event) {
    event.preventDefault()
    this.left()
  }

  @keydown(Keys.RIGHT)
  handleKeyPressRight(event) {
    event.preventDefault()
    this.right()
  }

  @keydown(Keys.ENTER)
  handleEnter(event) {
    event.preventDefault()
    console.log('ENTER!')
    const { dispatch } = this.props
    dispatch(setBookModalShown(true))
  }

  up() {
    const { dispatch } = this.props
    dispatch(shiftYear(+1))
  }

  down() {
    const { dispatch } = this.props
    dispatch(shiftYear(-1))
  }

  left() {
    const { dispatch } = this.props
    dispatch(shiftBookSelection(-1))
  }

  right() {
    const { dispatch } = this.props
    dispatch(shiftBookSelection(+1))
  }

  render() {
    return (
      <>
        <div className='button-group'>
          <button className='btn btn-light' onClick={ () => this.up() }>UP</button>
          <button className='btn btn-light' onClick={ () => this.down() }>DOWN</button>
          <button className='btn btn-light' onClick={ () => this.left() }>LEFT</button>
          <button className='btn btn-light' onClick={ () => this.right() }>RIGHT</button>
        </div>
        { this.props.children }
      </>
    )
  }
}

export default connect()(NavController)
