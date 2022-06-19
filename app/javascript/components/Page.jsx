import React from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from 'store/store'
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import Notifications from 'widgets/notifications/Notifications'
import Modals from 'modals/AllModals'
import Navbar from 'widgets/navbar/Navbar'
import PageContent from 'components/PageContent'
import UrlStoreProvider from 'store/urlStore/Provider'
import { setDefaultBookImageUrl } from 'store/books/actions'

const Page = (props) => {
  store.dispatch(setDefaultBookImageUrl(props.default_book_image_url))

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <UrlStoreProvider>
          <Modals/>

          <Notifications/>

          <Container className='page'>
            <Navbar/>
            <PageContent/>
          </Container>
        </UrlStoreProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default Page
