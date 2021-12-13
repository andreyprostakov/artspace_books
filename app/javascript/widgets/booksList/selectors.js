import { difference, pick } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'
import { pickNearEntries } from 'utils/pickNearEntries'
import { selectCurrentBookId } from 'store/axis/selectors'

export const selectBook = id => state => state.booksList.booksIndexed[id]

export const selectBookIdsByYear = year => state => selectShuffledBooksOfYear(year)(state).map(book => book.id)

export const selectBookDefaultImageUrl = () => state => state.booksList.defaultCoverUrl

export const selectBooks = () => state => Object.values(state.booksList.booksIndexed)

export const selectCurrentBook = () => state => selectBook(selectCurrentBookId()(state))(state)

export const selectCurrentBookDetails = () => state => state.booksList.bookDetailsCurrent

export const selectCurrentYear = () => state => selectCurrentBook()(state)?.year

export const selectNextBookId = () => state => state.booksList.bookNextId

export const selectSeed = () => state => state.booksList.seed

export const selectShuffledBooksOfYear = (year) => state => {
  return shuffle(selectBooks()(state).filter(book => book.year == year), selectSeed()(state))
}

export const selectSyncedBookId = () => state => state.booksList.bookInSyncId

export const selectYearCurrentBookId = (year) => state => state.booksList.bookIdsCurrentInYear[year]

export const selectYears = () => state => state.booksList.years.slice()

export const selectYearsReversed = () => state => selectYears()(state).reverse()

export const selectYearsToDisplay = () => state => {
  const currentBook = selectCurrentBook()(state)
  if (!currentBook) { return [] }

  const topYear = currentBook?.year
  return pickNearEntries(selectYearsReversed()(state), topYear, { lengthBefore: 1, lengthAfter: 1, looped: false })
}

export const selectYearsToLoad = year => state => {
  const { yearsToLoad, yearsInLoading, yearsLoaded } = state.booksList
  const nearYears = pickNearEntries(
    selectYearsReversed()(state),
    year,
    { lengthBefore: 2, lengthAfter: 2, looped: false }
  )
  return [
    ...yearsToLoad,
    ...difference(nearYears, [...yearsInLoading, ...yearsLoaded])
  ]
}
