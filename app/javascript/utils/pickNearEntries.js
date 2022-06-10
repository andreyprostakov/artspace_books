import { compact, isEmpty, min } from 'lodash'

const pickNearEntries = (entries, middle, { lengthBefore = 1, lengthAfter = 1, looped = true } = {}) => {
  const middleIndex = entries.indexOf(middle)

  if (isEmpty(entries)) { return [] }

  let indexes = []
  const minOffset = -min([Math.floor((entries.length - 1) / 2), lengthBefore])
  const maxOffset = +min([Math.floor(entries.length / 2), lengthAfter])
  let currentOffset = minOffset
  while (currentOffset <= maxOffset) {
    let realIndex = middleIndex + currentOffset
    if (looped) { realIndex = indexToLoopedIndex(realIndex, entries) }
    if (!indexes.includes(realIndex)) { indexes.push(realIndex) }

    currentOffset += 1
  }

  return compact(indexes.map(index => entries[index]))
}

const indexToLoopedIndex = (index, entries) => {
  const limit = entries.length
  return (index % limit + limit) % limit
}

export { pickNearEntries }
