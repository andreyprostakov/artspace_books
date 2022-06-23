import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'store/store'
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import Notifications from 'widgets/notifications/Notifications'
import Modals from 'modals/AllModals'
import Navbar from 'widgets/navbar/Navbar'
import PageContent from 'components/PageContent'
import PageRouteHelpers from 'components/PageRouteHelpers'
import RootUrlStoreProvider from 'store/urlStore/RootStoreProvider'
import { setDefaultBookImageUrl } from 'store/books/actions'
import { setDefaultAuthorImageUrl } from 'store/authors/actions'

const Page = (props) => {
  store.dispatch(setDefaultBookImageUrl(props.default_book_image_url))
  store.dispatch(setDefaultAuthorImageUrl(props.default_author_image_url))

  return (
    <ReduxProvider store={ store }>
      <BrowserRouter>
        <RootUrlStoreProvider>
          <PageRouteHelpers/>

          <Modals/>

          <Notifications/>

          <Container className='page'>
            <Navbar/>
            <PageContent/>
          </Container>
        </RootUrlStoreProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default Page
