import React, { useState , useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import BooksList from 'components/BooksList'
import AuthorBooksList from 'components/AuthorBooksList'
import { selectCurrentAuthor, selectCurrentAuthorId, selectSelectedBookId, selectSeed } from 'store/selectors'
import { reloadBook, setCurrentBookId, setSeed, setupStoreForBooksPage, setupStoreForAuthorPage } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const pageContent = () => {
  const author = useSelector(selectCurrentAuthor())
  const [{ bookId }, { gotoBook }] = useUrlStore()
  const dispatch = useDispatch()
  const currentBookId = useSelector(selectSelectedBookId())
  const seed = useSelector(selectSeed())

  useEffect(() => {
    if (seed) { return }

    dispatch(setSeed())
  }, [seed])

  useEffect(() => {
    if (!bookId || currentBookId == bookId) { return } 

    dispatch(setCurrentBookId(bookId))
  }, [bookId])

  useEffect(() => {
    if (!currentBookId || currentBookId == bookId) { return }

    gotoBook(currentBookId)
  }, [currentBookId])

  return (
    <>
      <Row>
        <Switch>
          <Route exact path='/'>
            HOME
          </Route>
          <Route path='/authors/:authorId'>
            <AuthorPage/>
          </Route>
          <Route path='/books'>
            <BooksPage/>
          </Route>
          <Route path='/:foobar'>
            UNKNOWN ROUTE
          </Route>
        </Switch>
      </Row>
    </>
  );
}

const BooksPage = () => {
  const dispatch = useDispatch()
  const [{ bookId }] = useUrlStore()

  useEffect(() => dispatch(setupStoreForBooksPage(bookId)), [])

  return (
    <BooksList/>
  )
}

const AuthorPage = () => {
  const [{ authorId, bookId }] = useUrlStore()
  const dispatch = useDispatch()
  const currentAuthorId = useSelector(selectCurrentAuthorId())

  useEffect(() => {
    if (!authorId) { return }

    dispatch(setupStoreForAuthorPage(authorId, bookId))
  }, [authorId])

  if (!currentAuthorId) { return null }

  return (
    <AuthorBooksList/>
  )
}

export default pageContent
