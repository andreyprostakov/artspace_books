import { useUrlStore } from 'store/urlStore'

export const usePageUrlStore = () => {
  const [state, baseActions, paths] = useUrlStore((params, query) => ({
    authorId: parseInt(query.get('author_id')),
    sortOrder: query.get('sort_order')
  }))
  const { patch, buildPath } = baseActions

  return [
    state,
    {
      ...baseActions,
      changeSortOrder: (order) => patch(buildPath({ params: { sort_order: order } })),
      addAuthorWidget: (id) => patch(buildPath({ params: { author_id: id } })),
      removeAuthorWidget: () => patch(buildPath({ params: { author_id: null } })),
    },
    paths
  ]
}

export default usePageUrlStore
