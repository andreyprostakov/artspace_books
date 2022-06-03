const localState = state => state.booksListLinear

export const selectBookIds = () => state => localState(state).bookIds
