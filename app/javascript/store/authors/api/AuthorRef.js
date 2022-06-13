class AuthorRef {
  static parse(data) {
    return {
      id: data['id'],
      fullname: data['fullname'],
      booksCount: data['books_count'],
    }
  }
}

export default AuthorRef
