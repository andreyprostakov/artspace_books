import { useUrlStore } from 'store/urlStore'

export const usePageUrlStore = () => {
  return useUrlStore((params, query) => ({
    authorId: parseInt(params.authorId),
    bookId: parseInt(query.get('book_id')) || null
  }))
}

export default usePageUrlStore
