import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import keydown, { Keys } from 'react-keydown'
import { shiftSelectionDown, shiftSelectionUp, selectCurrentYears } from 'store/booksListSlice'

window.Keys = Keys

@keydown(Keys.DOWN, Keys.UP)
class NavController extends React.Component {
  @keydown(Keys.DOWN)
  dddshiftSelectionDown(event) {
    const { dispatch } = this.props
    console.log('SHIFT DOWN!')
    event.preventDefault()
    console.log(event)
    console.log([dispatch, shiftSelectionDown])
    dispatch({ type: 'booksList/shiftSelectionDown' })
  }

  @keydown(Keys.UP)
  dddshiftSelectionUp(event) {
    const { dispatch } = this.props
    event.preventDefault()
    dispatch({ type: 'booksList/shiftSelectionUp' })
  }

  render() {
    const { dispatch } = this.props
    return (
      <div className='button-group'>
        <button className='btn btn-light' onClick={ () => dispatch(() => shiftSelectionUp()) }>UP</button>
        <button className='btn btn-light' onClick={ () => dispatch(() => shiftSelectionDown()) }>DOWN</button>
        <button className='btn btn-light'>LEFT</button>
        <button className='btn btn-light'>RIGHT</button>
      </div>
    )
  }
}

export default connect()(NavController)
