export const selectIdsSelected = () => state => state.selectables.idsSelected

export const selectBatchModeOn = () => state => selectIdsSelected()(state).length > 0

export const selectIdIsSelected = id => state => selectIdsSelected()(state).includes(id)
