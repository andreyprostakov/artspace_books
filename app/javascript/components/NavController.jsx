import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import keydown, { Keys } from 'react-keydown'
import { gotoFirstYear, gotoLastYear, shiftYear, shiftBookSelection, setBookModalShown, selectCurrentBook, setCurrentAuthor } from 'store/booksListSlice'

window.Keys = Keys

@keydown()
class NavController extends React.Component {
  @keydown(Keys.DOWN)
  handleKeyPressDown(event) {
    event.preventDefault()
    this.down()
  }

  @keydown(Keys.PAGEDOWN)
  handleKeyPressPageDown(event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(shiftYear(-2))
  }

  @keydown(Keys.END)
  handleKeyPressEnd(event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(gotoFirstYear())
  }

  @keydown(Keys.UP)
  handleKeyPressUp(event) {
    event.preventDefault()
    this.up()
  }

  @keydown(Keys.PAGEUP)
  handleKeyPressPageUp(event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(shiftYear(+2))
  }

  @keydown(Keys.HOME)
  handleKeyPressHome(event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(gotoLastYear())
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

  @keydown(Keys.E)
  handleKeyPressE(event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(setBookModalShown(true))
  }

  @keydown(Keys.A)
  handleKeyPressA(event) {
    event.preventDefault()
    const { currentBook, dispatch } = this.props
    console.log(currentBook)
    if (!currentBook) { return }

    dispatch(setCurrentAuthor(currentBook.authorId))
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
        <button className='btn btn-light' onClick={ () => this.down() }>DOWN</button>
        { this.props.children }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentBook: selectCurrentBook(state)
  }
}

export default connect(mapStateToProps)(NavController)
