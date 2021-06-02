import { compact, difference } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'

export const selectSeed = () => state => state.booksList.seed

// YEARS

export const selectYearsReversed = () => state => state.booksList.years.all.slice().reverse()

export const selectCurrentYear = () => state => {
  const book = selectCurrentBook()(state)
  return book?.year
}

export const selectYearsToDisplay = () => state => {
  const currentBook = selectCurrentBook()(state)
  if (!currentBook) { return [] }

  const topYear = currentBook?.year
  const { all } = state.booksList.years
  const allReversed = all.slice().reverse()
  const index = allReversed.indexOf(topYear)
  return compact(
    [
      topYear,
      allReversed[index + 1],
      allReversed[index + 2]
    ]
  )
}

export const selectYearsToLoad = year => state => {
  const { all } = state.booksList.years
  const { yearsToLoad, yearsInLoading, yearsLoaded } = state.booksList.books
  const allReversed = all.slice().reverse()
  const index = allReversed.indexOf(year)
  const nearYears = compact(
    [
      allReversed[index - 2],
      allReversed[index - 1],
      year,
      allReversed[index + 1],
      allReversed[index + 2]
    ]
  )
  return [...yearsToLoad, ...difference(nearYears, [...yearsInLoading, ...yearsLoaded])]
}

// AUTHORS

export const selectAuthors = () => state => Object.values(state.booksList.authors.byIds)

export const selectAuthor = id => state => state.booksList.authors.byIds[id]

export const selectCurrentAuthorId = () => state => state.booksList.authors.currentId

export const selectCurrentAuthorDetails = () => state => state.booksList.authors.currentDetails

export const selectCurrentAuthor = () => state => {
  const { byIds: all, currentId } = state.booksList.authors
  return all[currentId]
}

// BOOKS

export const selectBook = id => state => state.booksList.books.byIds[id]

export const selectBooks = () => state => Object.values(state.booksList.books.byIds)

export const selectCurrentBook = () => state => {
  const { byIds: all, currentId } = state.booksList.books
  return all[currentId]
}

export const selectCurrentBookId = () => state => state.booksList.books.currentId

export const selectCurrentBookDetails = () => state => state.booksList.books.currentDetails

export const selectShuffledBooksOfYear = (year) => state => {
  const { seed } = state.booksList
  return shuffle(
    Object.values(state.booksList.books.byIds).filter(book => book.year == year),
    seed
  )
}

export const selectBookIdsByYear = year => state => {
  return selectShuffledBooksOfYear(year)(state).map(book => book.id)
}

export const selectBookDefaultImageUrl = () => state => state.booksList.books.defaultImageUrl
