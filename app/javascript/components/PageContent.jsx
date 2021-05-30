import React, { useState , useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import BooksList from 'components/BooksList'
import AuthorCard from 'components/AuthorCard'
import { selectCurrentAuthor, selectSelectedBookId, selectSeed } from 'store/selectors'
import { reloadBook, setCurrentBookId, setSeed, fetchYears, fetchAuthors } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const pageContent = () => {
  const author = useSelector(selectCurrentAuthor())
  const [{ bookId }, { setCurrentBookId: setUrlBookId }] = useUrlStore()
  const dispatch = useDispatch()
  const currentBookId = useSelector(selectSelectedBookId())
  const seed = useSelector(selectSeed())

  useEffect(() => {
    if (seed) { return }
    
    dispatch(setSeed())
    dispatch(fetchYears())
    dispatch(fetchAuthors())
  }, [seed])

  useEffect(() => {
    if (!bookId || currentBookId == bookId) { return } 

    dispatch(reloadBook(bookId))
    dispatch(setCurrentBookId(bookId))
  }, [bookId])

  useEffect(() => {
    if (!currentBookId || currentBookId == bookId) { return }

    setUrlBookId(currentBookId)
  }, [currentBookId])

  return (
    <>
      <Switch>
        <Route exact path='/'>
          HOME
        </Route>
        <Route path='/authors/:authorId/foobar'>
          AUTHOR ROUTE
        </Route>
        <Route path='/books'>
          BOOKS ROUTE
        </Route>
        <Route path='/:foobar'>
          UNKNOWN ROUTE
        </Route>
      </Switch>
      <Row>
        { author && <Col xs={ 4 } lg={ 3 }className='author-card'><AuthorCard/></Col> }
        { <Col xs={ author ? 8 : 12 } lg={ author ? 9 : 12 }><BooksList/></Col> }
      </Row>
    </>
  );
}

export default pageContent
