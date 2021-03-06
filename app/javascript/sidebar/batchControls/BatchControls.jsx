import React, { useContext, useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CloseIcon from 'components/icons/CloseIcon'
import FormInputTags from 'components/FormInputTags'
import { selectAuthorRef } from 'store/authors/selectors'
import { selectBooksIndexEntry } from 'store/books/selectors'
import { selectIdsSelected, selectBatchModeOn } from 'store/selectables/selectors'
import { clearSelection, unselectId } from 'store/selectables/actions'
import apiClient from 'store/books/apiClient'
import UrlStoreContext from 'store/urlStore/Context'

const BatchControls = (props) => {
  const dispatch = useDispatch()
  const bookIds = useSelector(selectIdsSelected())
  const [state, setState] = useState({ currentTags: [] })
  const widgetShown = useSelector(selectBatchModeOn())
  const { onSuccess } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = { tagNames: state.currentTags.map(tag => tag.name) }

    apiClient.updateBooksBatch(bookIds, state.currentTags.map(tag => tag.name)).then(() => {
      onSuccess && onSuccess(bookIds)
    })
  }

  if (!widgetShown) { return null }

  return (
    <Card className='sidebar-widget-batch-controls sidebar-card-widget'>
      <CloseIcon onClick={ () => dispatch(clearSelection()) }/>
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
  const book = useSelector(selectBooksIndexEntry(id))
  const authorRef = useSelector(selectAuthorRef(book?.authorId))
  const { actions: { showBooksIndexEntry } } = useContext(UrlStoreContext)

  if (!book) return null

  return (
    <ListGroup.Item key={ id }>
      <a className='icon-remove' onClick={ () => dispatch(unselectId(id)) }>X</a>
      { ' | ' }
      <a href='#' onClick={ (e) => { e.preventDefault(); showBooksIndexEntry(id) } }>
        { authorRef.fullname }. { book.title }
      </a>
    </ListGroup.Item>
  )
}

export default BatchControls
