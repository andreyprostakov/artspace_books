import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { HotKeys } from 'react-hotkeys'

import { selectSortedAuthors } from 'pages/authorsPage/selectors'

import Layout from 'pages/Layout'
import AuthorsIndexControls from 'sidebar/authorsIndexControls/Controls'
import AuthorsListItem from 'pages/authorsPage/components/AuthorsListItem'
import AuthorCard from 'sidebar/authorCard/AuthorCard'
import PageConfigurer from 'pages/authorsPage/PageConfigurer'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorsPage = () => {
  const dispatch = useDispatch()
  const { pageState: { sortOrder }, actions: { removeAuthorWidget } } = useContext(UrlStoreContext)
  const authors = useSelector(selectSortedAuthors(sortOrder))

  const keyMap = {
    SHIFT_ON: { sequence: 'shift', action: 'keydown' },
    SHIFT_OFF: { sequence: 'shift', action: 'keyup' },
    UP: 'Up',
  }

  const hotKeysHandlers = {
    SHIFT_ON: () => console.log('SHIFT PUSHED'),
    SHIFT_OFF: () => console.log('SHIFT RELEASED'),
    UP: () => console.log('UP'),
  }

  return (
    <>
      <PageConfigurer/>

      <HotKeys keyMap={ keyMap } handlers={ hotKeysHandlers }>
        <Layout className='authors-list-page'>
          <Col sm={4}>
            <div className='page-sidebar'>
              <AuthorCard onClose={ () => removeAuthorWidget() }/>
              <AuthorsIndexControls/>
            </div>
          </Col>

          <Col sm={8}>
            <Row className='authors-list'>
              { authors.map(author =>
                <AuthorsListItem key={ author.id } author={ author }/>
              ) }
            </Row>
          </Col>
        </Layout>
      </HotKeys>
    </>
  )
}

export default AuthorsPage
