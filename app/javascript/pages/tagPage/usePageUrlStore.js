import { useUrlStore } from 'store/urlStore'

export const usePageUrlStore = () => {
  return useUrlStore((params, query) => ({
    tagId: parseInt(params.tagId),
  }))
}

export default usePageUrlStore
