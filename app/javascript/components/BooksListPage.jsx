import React from 'react'
import { Provider } from 'react-redux'
import store from 'store/store'
import BooksList from 'components/BooksList'
import NavController from 'components/NavController'

const booksListPage = () => {
  window.STORE = store
  return (
    <Provider store={ store }>
      <div className='page'>
        <NavController/>
        <BooksList/>
      </div>
    </Provider>
  );
}

export default booksListPage
