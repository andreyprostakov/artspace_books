import React from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from 'store/store'
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import Navbar from 'widgets/navbar/Navbar'
import PageContent from 'components/PageContent'
import { setDefaultBookImageUrl } from 'store/metadata/actions'

const Page = (props) => {
  store.dispatch(setDefaultBookImageUrl(props.default_book_image_url))

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Container className='page'>
          <Navbar/>
          <PageContent/>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default Page
