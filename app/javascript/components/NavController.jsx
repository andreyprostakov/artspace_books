import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Button, Container, Row } from 'react-bootstrap'
import keydown, { Keys } from 'react-keydown'
import { gotoFirstYear, gotoLastYear, shiftYear, shiftBookSelection, setBookModalShown, selectCurrentBook, setCurrentAuthor, selectCurrentAuthor, showFullList } from 'store/booksListSlice'

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
    const { currentAuthor, currentBook, dispatch } = this.props

    if (currentAuthor) {
      dispatch(showFullList)
    } else if (currentBook) {
      dispatch(setCurrentAuthor(currentBook.authorId))
    }
  }

  @keydown(Keys.BACKSPACE)
  handleKeyPressBackspace(event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(showFullList)
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
      <Container>
        <Row style={ { marginTop: 58, marginBottom: 5 } }>
          <Button variant='outline-danger' onClick={ () => this.down() }>DOWN</Button>
        </Row>
        { this.props.children }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentBook: selectCurrentBook(state),
    currentAuthor: selectCurrentAuthor(state)
  }
}

export default connect(mapStateToProps)(NavController)
