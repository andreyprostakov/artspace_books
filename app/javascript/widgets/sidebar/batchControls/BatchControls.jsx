import React, { useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CloseIcon from 'components/icons/CloseIcon'
import FormInputTags from 'components/FormInputTags'
import { selectAuthor } from 'store/metadata/selectors'
import {
  selectBatchModeOn,
  selectBook,
  selectBookIdsSelected,
} from 'widgets/booksList/selectors'
import {
  clearBooksSelection,
  reloadBooks,
  removeBookIdFromSelected,
  showBook,
} from 'widgets/booksList/actions'
import apiClient from 'serverApi/apiClient'

const BatchControls = () => {
  const dispatch = useDispatch()
  const bookIds = useSelector(selectBookIdsSelected())
  const [state, setState] = useState({ currentTags: [] })
  const widgetShown = useSelector(selectBatchModeOn())

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = { tagNames: state.currentTags.map(tag => tag.name) }

    apiClient.postTagsForBooksBatch(bookIds, state.currentTags.map(tag => tag.name)).then(() =>
      dispatch(reloadBooks())
    )
  }

  if (!widgetShown) { return null }

  return (
    <Card className='sidebar-card-widget' id='sidebar_batch_controls'>
      <CloseIcon onClick={ () => dispatch(clearBooksSelection()) }/>
      <Card.Header className='widget-title'>Selection</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <div className='section-title'>Books:</div>
          <ListGroup variant='flush' className='batch-list'>
            { bookIds.map(id =>
              <SelectedBooksEntry key={ id } id={ id }/>
            ) }
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className='section-title'>Tags to assign:</div>
          <Form id='books_batch_form' onSubmit={ handleSubmit }>
            <FormInputTags initialTags={ [] } onChange={ (tags) => setState({ currentTags: tags }) }/>

            { state.currentTags.length > 0 &&
              <Button variant='primary' form='books_batch_form' type='submit'>
                SAVE
              </Button>
            }
          </Form>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

const SelectedBooksEntry = (props) => {
  const { id } = props
  const dispatch = useDispatch()
  const book = useSelector(selectBook(id))
  const author = useSelector(selectAuthor(book.authorId))

  return (
    <ListGroup.Item key={ id }>
      <a className='icon-remove' onClick={ () => dispatch(removeBookIdFromSelected(id)) }>X</a>
      { ' | ' }
      <a href='#' onClick={ (e) => { e.preventDefault(); dispatch(showBook(id)) } }>{ author.fullname }. { book.title }</a>
    </ListGroup.Item>
  )
}

export default BatchControls
