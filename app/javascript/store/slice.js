import { difference, find, last, sort, uniq } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'
import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'booksList',
  initialState: {
    books: {
      byIds: {},
      currentId: null,
      currentDetails: {},
      modalShown: false,
      yearsLoaded: [],
      yearsToLoad: [],
      yearsInLoading: [],
      defaultImageUrl: null
    },
    years: {
      all: [],
      current: null
    },
    authors: {
      byIds: {},
      currentId: null,
      currentDetails: {},
      modalShown: false
    }
  },
  reducers: {
    setSeed: (state) => { state.seed = Date.now() },

    setYears: (state, action) => {
      const years = action.payload
      state.years.all = years
      if (!years.includes(state.years.current)) {
        state.years.current = last(years)
      }
    },

    addYearsToLoad: (state, action) => {
      const years = action.payload
      state.books.yearsToLoad = years
    },

    markYearsAsLoading: (state, action) => {
      const years = state.books.yearsToLoad
      state.books.yearsToLoad = []
      state.books.yearsInLoading = uniq([...state.books.yearsInLoading, ...years])
    },

    markYearsAsLoaded: (state, action) => {
      const years = action.payload
      state.books.yearsLoaded = uniq([...state.books.yearsLoaded, ...years])
      state.books.yearsInLoading = difference(state.books.yearsInLoading, years)
    },

    setCurrentYear: (state, action) => {
      const targetYear = action.payload
      state.years.current = targetYear
    },

    setAuthors: (state, action) => {
      const authors = action.payload
      state.authors.byIds = {}
      state.authors.currentId = null
      authors.forEach(author => state.authors.byIds[author.id] = author)
    },

    setCurrentAuthorId: (state, action) => {
      const id = action.payload
      state.authors.currentId = id
    },

    setCurrentAuthorDetails: (state, action) => {
      const details = action.payload
      state.authors.currentDetails = details
    },

    setAuthorModalShown: (state, action) => {
      const shown = action.payload
      state.authors.modalShown = shown
      if (!shown) { state.authors.bookDetails = {} }
    },

    showNewAuthorModal: (state, action) => {
      state.authors.currentId = null
      state.authors.currentDetails = { new: true }
      state.authors.modalShown = true
    },

    switchToNewAuthor: (state, action) => {
      const details = action.payload
      state.authors.currentId = details.id
      state.authors.currentDetails = details
      state.authors.byIds[details.id] = { id: details.id, fullname: details.fullname }
      state.years.all = []
      state.years.current = null
      state.books.byIds = {}
      state.books.currentId = null
    },

    addAuthor: (state, action) => {
      const author = action.payload
      state.authors.byIds[author.id] = author
    },


    setBooks: (state, action) => {
      const { seed } = state
      const books = shuffle(action.payload, seed)
      state.books.byIds = {}
      books.forEach(book => state.books.byIds[book.id] = book)

      const years = uniq(books.map(book => book.year))
      state.books.yearsToLoad = []
      state.books.yearsInLoading = []
      state.books.yearsLoaded = years
    },

    addBook: (state, action) => {
      const book = action.payload
      const { year: bookYear } = book
      const { all: allYears, current: previouslyCurrentYear } = state.years

      state.books.byIds[book.id] = book
      state.books.currentId = book.id
      if (!allYears.includes(bookYear)) {
        state.years.all = [...allYears, bookYear].sort()
        state.books.yearsLoaded = [...state.books.yearsLoaded, bookYear]
      }
      if (previouslyCurrentYear !== bookYear) {
        state.years.current = bookYear

        const yearBook = Object.values(state.books.byIds).find(book => book.year == previouslyCurrentYear)
        if (!yearBook) {
          state.years.all = state.years.all.filter(year => year != previouslyCurrentYear)
        }
      }
    },

    addBooks: (state, action) => {
      const { seed } = state
      const books = shuffle(action.payload, seed)
      books.forEach(book => state.books.byIds[book.id] = book)
    },

    setDefaultBookImageUrl: (state, action) => {
      const url = action.payload
      state.books.defaultImageUrl = url
    },

    setBookModalShown: (state, action) => {
      const shown = action.payload
      state.books.modalShown = shown
      if (!shown) { state.books.bookDetails = {} }
    },

    setCurrentBookId: (state, action) => {
      const id = action.payload
      state.books.currentId = id
    },

    setCurrentBookDetails: (state, action) => {
      const details = action.payload
      state.books.currentDetails = details
    },

    showNewBookModal: (state, action) => {
      const authorId = state.authors.currentId
      if (!authorId) { return }

      state.books.currentId = null
      state.books.modalShown = true
      state.books.currentDetails = { authorId, new: true }
      state.years.current = null
    }
  }
})

export default slice.reducer
