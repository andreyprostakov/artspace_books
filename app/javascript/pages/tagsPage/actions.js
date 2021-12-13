import { fetchAllTags } from 'store/metadata/actions'

export const setupStoreForTagsPage = () => async (dispatch, getState) => {
    dispatch(fetchAllTags())
}
