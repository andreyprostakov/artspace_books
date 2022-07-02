class BookSearchEntry {
  static parse(data) {
    return {
      bookId: data['book_id'],
      highlight: data['highlight'],
      title: data['title'],
      year: data['year'],
      authorId: data['author_id'],
    }
  }
}

export default BookSearchEntry
