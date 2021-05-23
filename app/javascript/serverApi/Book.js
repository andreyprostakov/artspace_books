export class Book {
  static parse(bookData) {
    return {
      ...bookData,
      authorId: bookData.author_id,
      coverUrl: bookData.cover_url
    }
  }
}
