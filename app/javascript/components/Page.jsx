import React from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from 'store/store'
import { Container } from 'react-bootstrap'

import AuthorModal from 'components/AuthorModal'
import BookModal from 'components/BookModal'
import NavController from 'components/NavController'
import PageHeader from 'components/PageHeader'
import PageContent from 'components/PageContent'

import { setDefaultBookImageUrl } from 'store/actions'

const Page = (props) => {
  window.STORE = store
  store.dispatch(setDefaultBookImageUrl(props.default_book_image_url))
  return (
    <Provider store={ store }>
      <NavController>
        <Container className='page'>
          <PageHeader/>
            <PageContent/>
          <BookModal/>
          <AuthorModal/>
        </Container>
      </NavController>
    </Provider>
  );
}

export default Page
