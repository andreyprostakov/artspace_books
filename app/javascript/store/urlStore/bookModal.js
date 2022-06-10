const NEW_BOOK_HASH = '#new-book'
const EDIT_BOOK_HASH = '#edit-book'

const wrapper = urlStoreHelpers => (calculatePageState = null) => {
  const [state, actions, paths] = urlStoreHelpers((params, query, location) => {
    const innerState = calculatePageState ? calculatePageState(params, query, location) : {}
    const { bookId } = innerState
    const { hash } = location
    return {
      ...innerState,
      newBookModalShown: hash === NEW_BOOK_HASH,
      editBookModalShown: Boolean(bookId) && (hash === EDIT_BOOK_HASH),
    }
  })
  const { buildPath, showModal } = actions
  return [
    state,
    {
      ...actions,
      openNewBookModal: () => showModal(NEW_BOOK_HASH),
      openEditBookModal: () => showModal(EDIT_BOOK_HASH),
    },
    {
      ...paths,
      newBookModalPath: () => buildPath({ hash: NEW_BOOK_HASH }),
      editBookModalPath: id => buildPath({ params: { bookId: id }, hash: EDIT_BOOK_HASH }),
    }
  ]
}

export default wrapper
