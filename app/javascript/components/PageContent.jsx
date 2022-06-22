import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import AuthorsPage from 'pages/authorsPage/Page'
import BooksPage from 'pages/booksPage/Page'

import BookerPage from 'pages/awards/bookerPage/Page'
import CampbellPage from 'pages/awards/campbellPage/Page'
import GoodreadsChoicePage from 'pages/awards/goodreadsPage/Page'
import HugoPage from 'pages/awards/hugoPage/Page'
import NebulaPage from 'pages/awards/nebulaPage/Page'
import NYTimesPage from 'pages/awards/nyTimesPage/Page'
import ProsvetitelPage from 'pages/awards/prosvetitelPage/Page'
import PulitzerPage from 'pages/awards/pulitzerPage/Page'

import pageRoutes from 'components/pageRoutes'

const PageContent = () => {
  const dispatch = useDispatch()

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/books'/>
      </Route>

      <Route path='/books'>
        <BooksPage/>
      </Route>

      { pageRoutes.map((route, i) =>
        <Route path={ route.path } key={ i }>
          <route.Renderer/>
        </Route>
      ) }

      <Route path='/awards/booker'>
        <BookerPage/>
      </Route>

      <Route path='/awards/campbell'>
        <CampbellPage/>
      </Route>

      <Route path='/awards/goodreads'>
        <GoodreadsChoicePage/>
      </Route>

      <Route path='/awards/hugo'>
        <HugoPage/>
      </Route>

      <Route path='/awards/nebula'>
        <NebulaPage/>
      </Route>

      <Route path='/awards/nytimes'>
        <NYTimesPage/>
      </Route>

      <Route path='/awards/prosvetitel'>
        <ProsvetitelPage/>
      </Route>

      <Route path='/awards/pulitzer'>
        <PulitzerPage/>
      </Route>

      <Route path='/:foobar'>
        UNKNOWN ROUTE
      </Route>
    </Switch>
  );
}

export default PageContent
