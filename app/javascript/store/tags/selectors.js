import { pick } from 'lodash'

const BOOKMARK = 'BookmarkedByA'
const READ = 'ReadByA'

const localState = state => state.storeTags

export const selectTagsRefs = () => state => Object.values(localState(state).tagsRefs)

export const selectTagRef = id => state => localState(state).tagsRefs[id]

export const selectTagBookmark = () => () => BOOKMARK

export const selectTagIdBookmark = () => state => selectTagsRefs()(state).find(tag => tag.name === BOOKMARK)?.id

export const selectTagRead = () => () => READ

export const selectTagIdRead = () => state => selectTagsRefs()(state).find(tag => tag.name === READ)?.id

export const selectTagNames = ids => state => selectTagsRefsByIds(ids)(state).map(tag => tag.name)

export const selectTagsRefsByIds = ids => state => Object.values(pick(localState(state).tagsRefs, ids))

export const selectVisibleTags = tags => state => {
  const tagBookmark = selectTagBookmark()(state)
  const tagRead = selectTagRead()(state)
  return tags.filter(tag => ![tagBookmark, tagRead].includes(tag.name))
}

export const selectTagsRefsLoaded = () => state => localState(state).refsLoaded
