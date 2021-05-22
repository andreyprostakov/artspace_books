import React from 'react'
import { Provider } from 'react-redux'
import store from 'store/store'
import BooksList from 'components/BooksList'

const booksListPage = () => {
  window.STORE = store
  return (
    <Provider store={ store }>
      <BooksList/>
    </Provider>
  );
}

export default booksListPage
