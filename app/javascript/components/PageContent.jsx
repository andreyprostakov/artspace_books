import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import BooksPage from 'components/books/BooksPage'
import AuthorPage from 'components/authors/AuthorPage'
import AuthorsPage from 'pages/authorsPage/components/Page'
import TagPage from 'components/TagPage'
import TagsPage from 'components/TagsPage'
import { selectSeed } from 'store/selectors'
import { setSeed } from 'store/actions'

const PageContent = () => {
  const dispatch = useDispatch()
  const seed = useSelector(selectSeed())

  useEffect(() => {
    if (seed) { return }

    dispatch(setSeed())
  }, [seed])

  return (
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

      <Route path='/authors'>
        <AuthorsPage/>
      </Route>

      <Route path='/tags/:tagId'>
        <TagPage/>
      </Route>

      <Route path='/tags'>
        <TagsPage/>
      </Route>

      <Route path='/:foobar'>
        UNKNOWN ROUTE
      </Route>
    </Switch>
  );
}

export default PageContent
