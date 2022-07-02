class AuthorSearchEntry {
  static parse(data) {
    return {
      authorId: data['author_id'],
      highlight: data['highlight'],
    }
  }
}

export default AuthorSearchEntry
