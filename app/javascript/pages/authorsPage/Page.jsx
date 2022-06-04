import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { HotKeys } from 'react-hotkeys'

import { setupStoreForPage } from 'pages/authorsPage/actions'
import { selectLeftSidebarShown, selectSortedAuthors } from 'pages/authorsPage/selectors'
import { setCurrentAuthorId } from 'store/axis/actions'

import usePageUrlStore from 'pages/authorsPage/usePageUrlStore'
import Layout from 'pages/Layout'
import AuthorsListItem from 'pages/authorsPage/components/AuthorsListItem'
import AuthorsListControls from 'pages/authorsPage/components/AuthorsListControls'
import AuthorCard from 'widgets/sidebar/authorCard/AuthorCard'

const AuthorsPage = () => {
  const dispatch = useDispatch()
  const leftSidebarShown = useSelector(selectLeftSidebarShown())
  const [{ authorId, sortOrder }, { removeAuthorWidget }] = usePageUrlStore()
  const authors = useSelector(selectSortedAuthors(sortOrder))

  useEffect(() => dispatch(setupStoreForPage()), [])
  useEffect(() => dispatch(setCurrentAuthorId(authorId)), [authorId])

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
    <HotKeys keyMap={ keyMap } handlers={ hotKeysHandlers }>
      <Layout className='authors-list-page'>
        { leftSidebarShown &&
          <Col sm={4}>
            <AuthorCard authorId={ authorId } onClose={ () => removeAuthorWidget() }/>
          </Col>
        }

        <Col sm={ leftSidebarShown ? 8 : 12 }>
          <AuthorsListControls/>

          <Row className='authors-list'>
            { authors.map(author =>
              <AuthorsListItem key={ author.id } author={ author }/>
            ) }
          </Row>
        </Col>
      </Layout>
    </HotKeys>
  )
}

export default AuthorsPage
