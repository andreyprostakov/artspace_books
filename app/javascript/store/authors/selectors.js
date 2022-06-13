const localState = state => state.storeAuthors

export const selectAuthorRef = id => state => localState(state).authorsRefs[id]

export const selectAuthorsRefs = () => state => Object.values(localState(state).authorsRefs)

export const selectAuthorFull = id => state => localState(state).authorsFull[id]

export const selectAuthorIndexEntry = id => state => localState(state).authorsIndex[id]

export const selectAuthorsIndex = () => state => Object.values(localState(state).authorsIndex)
