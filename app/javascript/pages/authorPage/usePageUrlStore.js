import { useUrlStore } from 'store/urlStore'

export const usePageUrlStore = () => {
  const [state, actions, paths] = useUrlStore((params, query) => ({
    authorId: parseInt(params.authorId),
    bookId: parseInt(query.get('book_id')) || null
  }))
  const { patch, buildPath } = actions
  return [
    state,
    {
      ...actions,
      addBookWidget: (id) => patch(buildPath({ params: { book_id: id } })),
    },
    paths,
  ]
}

export default usePageUrlStore
