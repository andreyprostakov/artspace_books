import React from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from 'store/store'
import { Row, Col } from 'react-bootstrap'

import AuthorModal from 'components/AuthorModal'
import BookModal from 'components/BookModal'
import NavController from 'components/NavController'
import PageHeader from 'components/PageHeader'
import PageContent from 'components/PageContent'

import { setDefaultBookImageUrl } from 'store/booksListSlice'

const booksListPage = (props) => {
  window.STORE = store
  store.dispatch(setDefaultBookImageUrl(props.default_book_image_url))
  return (
    <Provider store={ store }>
      <div className='page'>
        <PageHeader/>
        <NavController>
          <PageContent/>
        </NavController>
        <BookModal/>
        <AuthorModal/>
      </div>
    </Provider>
  );
}

export default booksListPage
