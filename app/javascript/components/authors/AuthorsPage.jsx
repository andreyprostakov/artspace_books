import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { setupStoreForPage } from 'store/authorsList/actions'
import { selectLeftSidebarShown, selectSortedAuthors } from 'store/authorsList/selectors'
import { setCurrentAuthorId } from 'store/axis/actions'
import usePageUrlStore from 'pages/authorsPage/usePageUrlStore'

import Layout from 'components/Layout'
import AuthorsListItem from 'components/authors/AuthorsListItem'
import AuthorsListControls from 'components/authors/AuthorsListControls'
import AuthorCard from 'components/authors/AuthorCard'

const AuthorsPage = () => {
  const dispatch = useDispatch()
  const leftSidebarShown = useSelector(selectLeftSidebarShown())
  const [{ authorId: queryAuthorId, sortOrder }, { removeAuthorWidget }] = usePageUrlStore()
  const authors = useSelector(selectSortedAuthors(sortOrder))

  useEffect(() => dispatch(setupStoreForPage()), [])
  useEffect(() => dispatch(setCurrentAuthorId(queryAuthorId)), [queryAuthorId])

  return (
    <Layout className='authors-list-page'>
      { leftSidebarShown &&
        <Col sm={4}>
          <AuthorCard onClose={ () => removeAuthorWidget() }/>
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
  )
}

export default AuthorsPage
