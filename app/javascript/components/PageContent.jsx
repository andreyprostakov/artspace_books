import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import BooksPage from 'components/books/BooksPage'
import AuthorPage from 'components/authors/AuthorPage'
import AuthorNewModal from 'components/authors/AuthorNewModal'
import { selectSelectedBookId, selectSeed } from 'store/selectors'
import { setCurrentBookId, setSeed } from 'store/actions'
import { useUrlStore } from 'store/urlStore'

const PageContent = () => {
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
            <Redirect to='/books'/>
          </Route>
          
          <Route path='/books'>
            <BooksPage/>
          </Route>
          
          <Route path='/authors/:authorId'>
            <AuthorPage/>
          </Route>

          <Route path='/:foobar'>
            UNKNOWN ROUTE
          </Route>
        </Switch>
        <AuthorNewModal/>
      </Row>
    </>
  );
}

export default PageContent
