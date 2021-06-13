import { sortBy } from 'lodash'

export const sortByString = (entries, attributeName) => {
  return sortBy(entries, entry => entry[attributeName].toUpperCase())
}
