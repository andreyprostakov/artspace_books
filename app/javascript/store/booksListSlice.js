import { groupBy, find, mapValues, sort, uniq } from 'lodash'
import { createSlice, configureStore } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'booksList',
  initialState: {
    books: [],
    selectedBookId: null
  },
  reducers: {
    addBooks: (state, action) => {
      const books = action.payload
      state.books = state.books.concat(books)
      if (!state.selectedBookId) {
        state.selectedBookId = _.first(books).id
      }
    },

    shiftSelectionDown: (state) => {
      const { books, selectedBookId } = state
      if (books.length < 1 || !selectedBookId) { return }

      const years = uniq(books.map(book => book.year)).sort()
      const currentYear = find(books, { id: selectedBookId })?.year
      const previousYear = years[years.indexOf(currentYear) - 1]
      if (!previousYear) { return }

      const newSelectedBook = find(books, { year: previousYear })
      if (!newSelectedBook) { return }

      state.selectedBookId = newSelectedBook.id
    },

    shiftSelectionUp: (state) => {
      const { books, selectedBookId } = state
      if (books.length < 1 || !selectedBookId) { return }

      const years = uniq(books.map(book => book.year)).sort()
      const currentYear = find(books, { id: selectedBookId })?.year
      const nextYear = years[years.indexOf(currentYear) + 1]
      if (!nextYear) { return }

      const newSelectedBook = find(books, { year: nextYear })
      if (!newSelectedBook) { return }

      state.selectedBookId = newSelectedBook.id
    },

    shiftSelectionRight: (state) => {
      const { books, selectedBookId } = state
      if (books.length < 1 || !selectedBookId) { return }

      const selectedBook = find(books, { id: selectedBookId })
      const selectedBookIndex = books.indexOf(selectedBook)
      const newSelectedBook = books.find((book, index) => (index > selectedBookIndex) && (book.year == selectedBook.year))
      if (!newSelectedBook) { return }

      state.selectedBookId = newSelectedBook.id
    },

    shiftSelectionLeft: (state) => {
      const { books, selectedBookId } = state
      if (books.length < 1 || !selectedBookId) { return }

      const selectedBook = find(books, { id: selectedBookId })
      const reversedBooks = books.slice().reverse()
      const selectedBookIndex = reversedBooks.indexOf(selectedBook)
      const newSelectedBook = reversedBooks.find((book, index) => (index > selectedBookIndex) && (book.year == selectedBook.year))
      if (!newSelectedBook) { return }

      state.selectedBookId = newSelectedBook.id
    }
  }
})

export const { addBooks, shiftSelectionDown, shiftSelectionUp, shiftSelectionLeft, shiftSelectionRight } = slice.actions

export const selectBooks = state => state.booksList.books
export const selectBookIds = state => state.booksList.books.map(book => book.id)
export const selectBookById = id => state => find(state.booksList.books, { id: id })
export const selectBookIdsByYear = year => state => state.booksList.books.filter(book => book.year == year).map(book => book.id)
export const selectCurrentYears = state => uniq(state.booksList.books.map(book => book.year)).sort()

export default slice.reducer
