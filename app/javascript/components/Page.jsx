import React from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from 'store/store'
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import PageHeader from 'components/PageHeader'
import PageContent from 'components/PageContent'
import { setDefaultBookImageUrl } from 'widgets/booksList/actions'

const Page = (props) => {
  window.STORE = store
  store.dispatch(setDefaultBookImageUrl(props.default_book_image_url))

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Container className='page'>
          <PageHeader/>
          <PageContent/>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default Page
