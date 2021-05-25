import React from 'react'
import { Provider } from 'react-redux'
import store from 'store/store'
import { Row, Col } from 'react-bootstrap'

import AuthorModal from 'components/AuthorModal'
import BookModal from 'components/BookModal'
import NavController from 'components/NavController'
import PageHeader from 'components/PageHeader'
import PageContent from 'components/PageContent'

const booksListPage = () => {
  window.STORE = store
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
