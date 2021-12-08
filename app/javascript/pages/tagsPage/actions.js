import { fetchAllTags } from 'store/actions'

export const setupStoreForTagsPage = () => async (dispatch, getState) => {
    dispatch(fetchAllTags())
}
