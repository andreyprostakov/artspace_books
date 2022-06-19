const localState = state => state.urlStore

export const selectActions = () => state => localState(state).actionsDefinitions

export const selectPaths = () => state => localState(state).pathsDefinitions

export const selectPageState = () => state => localState(state).pageState
