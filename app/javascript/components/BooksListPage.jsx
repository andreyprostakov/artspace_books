import React from 'react'
import { Provider } from 'react-redux'
import store from 'store/store'
import BooksList from 'components/BooksList'
import BookModal from 'components/BookModal'
import NavController from 'components/NavController'
import PageHeader from 'components/PageHeader'

const booksListPage = () => {
  window.STORE = store
  return (
    <Provider store={ store }>
      <div className='page'>
        <PageHeader/>
        <NavController>
          <BooksList/>
        </NavController>
        <BookModal/>
      </div>
    </Provider>
  );
}

export default booksListPage
