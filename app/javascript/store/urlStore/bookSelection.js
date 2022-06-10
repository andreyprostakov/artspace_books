const wrapper = urlStoreHelpers => (calculatePageState = null) =>
  urlStoreHelpers((params, query, location) => {
    const bookId = parseInt(query.get('book_id')) || null
    return {
      ...(calculatePageState ? calculatePageState(params, query, location) : {}),
      bookId,
    }
  })

export default wrapper
