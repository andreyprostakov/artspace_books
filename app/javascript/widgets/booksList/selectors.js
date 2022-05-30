import { difference, pick } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'
import { pickNearEntries } from 'utils/pickNearEntries'
import { selectCurrentBookId } from 'store/axis/selectors'

export const selectBatchModeOn = () => state => selectBookIdsSelected()(state).length > 0

export const selectBook = id => state => state.booksList.booksIndexed[id]

export const selectBookIdsByYear = year => state => selectShuffledBooksOfYear(year)(state).map(book => book.id)

export const selectBookIsSelected = id => state => selectBookIdsSelected()(state).includes(id)

export const selectBookDefaultImageUrl = () => state => state.booksList.defaultCoverUrl

export const selectBooks = () => state => Object.values(state.booksList.booksIndexed)

export const selectBookIdsSelected = () => state => state.booksList.bookIdsSelected

export const selectBookShiftDirectionHorizontal = () => state => state.booksList.bookShiftDirectionHorizontal

export const selectBookShiftDirectionTimestamp = () => state => state.booksList.bookShiftDirectionTimestamp

export const selectCurrentBook = () => state => selectBook(selectCurrentBookId()(state))(state)

export const selectCurrentBookDetails = () => state => state.booksList.bookDetailsCurrent

export const selectCurrentYear = () => state => selectCurrentBook()(state)?.year

export const selectNextBookId = () => state => state.booksList.bookNextId

export const selectBookIdsInProcessing = () => state => state.booksList.bookIdsInProcessing

export const selectBookPopularities = (ids) => state => ids.map(id => selectBook(id)(state)?.popularity)

export const selectSeed = () => state => state.booksList.seed

export const selectShuffledBooksOfYear = (year) => state => {
  return shuffle(selectBooks()(state).filter(book => book.year == year), selectSeed()(state))
}

export const selectYearCurrentBookIds = () => state => state.booksList.bookIdsCurrentInYear

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
  const allYears = selectYearsReversed()(state)
  const yearsNearer = pickNearEntries(allYears, year, { lengthBefore: 2, lengthAfter: 2, looped: false })
  const yearsFarther = pickNearEntries(allYears, year, { lengthBefore: 5, lengthAfter: 5, looped: false })

  const yearsNearerNotLoaded = difference(yearsNearer, [...yearsInLoading, ...yearsLoaded])
  if (yearsNearerNotLoaded.length === 0) { return [...yearsToLoad] }

  return [
    ...yearsToLoad,
    ...difference(yearsFarther, [...yearsInLoading, ...yearsLoaded])
  ]
}
