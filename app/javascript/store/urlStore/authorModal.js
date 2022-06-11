const NEW_AUTHOR_HASH = '#new-author'
const EDIT_AUTHOR_HASH = '#edit-author'

const wrapper = urlStoreHelpers => (calculatePageState = null) => {
  const [state, actions, paths] = urlStoreHelpers((params, query, location) => {
    const authorId = parseInt(params.authorId) || parseInt(query.get('author_id')) || null
    const { hash } = location
    return {
      ...(calculatePageState ? calculatePageState(params, query, location) : {}),
      newAuthorModalShown: hash === NEW_AUTHOR_HASH,
      editAuthorModalShown: Boolean(authorId) && (hash === EDIT_AUTHOR_HASH),
    }
  })
  const { buildPath, showModal } = actions
  return [
    state,
    {
      ...actions,
      openNewAuthorModal: () => showModal(NEW_AUTHOR_HASH),
      openEditAuthorModal: () => showModal(EDIT_AUTHOR_HASH),
    },
    {
      ...paths,
      newAuthorModalPath: () => buildPath({ hash: NEW_AUTHOR_HASH }),
      editAuthorModalPath: id => buildPath({ params: { authorId: id }, hash: EDIT_AUTHOR_HASH }),
    }
  ]
}

export default wrapper
