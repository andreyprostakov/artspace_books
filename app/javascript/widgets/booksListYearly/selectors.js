import { difference, pick } from 'lodash'
import shuffle from 'knuth-shuffle-seeded'
import { pickNearEntries } from 'utils/pickNearEntries'

import { selectCurrentBookId, selectSeed } from 'store/axis/selectors'
import { selectBooks, selectCurrentBook } from 'store/metadata/selectors'
import { selectIdsSelected, selectBatchModeOn, selectIdIsSelected } from 'store/selectables/selectors'

export const selectBookIdsSelected = selectIdsSelected
export const selectBookIsSelected = selectIdIsSelected
export { selectBatchModeOn }

const localState = state => state.booksListYearly

export const selectBookIdsByYear = year => state => selectShuffledBooksOfYear(year)(state).map(book => book.id)

export const selectBookShiftDirectionHorizontal = () => state => localState(state).bookShiftDirectionHorizontal

export const selectCurrentYear = () => state => selectCurrentBook()(state)?.year

export const selectShuffledBooksOfYear = (year) => state => {
  return shuffle(selectBooks()(state).filter(book => book.year == year), selectSeed()(state))
}

export const selectYearCurrentBookIds = () => state => localState(state).bookIdsCurrentInYear

export const selectYearCurrentBookId = (year) => state => localState(state).bookIdsCurrentInYear[year]

export const selectYears = () => state => localState(state).years.slice()

export const selectYearsReversed = () => state => selectYears()(state).reverse()

export const selectYearsToDisplay = () => state => {
  const currentBook = selectCurrentBook()(state)
  if (!currentBook) { return [] }

  const topYear = currentBook?.year
  return pickNearEntries(selectYearsReversed()(state), topYear, { lengthBefore: 1, lengthAfter: 1, looped: false })
}

export const selectYearsInLoading = () => state => localState(state).yearsInLoading

export const selectYearsToLoad = () => state => localState(state).yearsToLoad

export const pickYearsToLoad = year => state => {
  const { yearsToLoad, yearsInLoading, yearsLoaded } = localState(state)
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