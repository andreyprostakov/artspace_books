class Author {
  static parse(data) {
    return {
      ...data,
      booksCount: data.books_count
    }
  }
}

export default Author
