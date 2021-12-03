class Book {
  static parse(bookData) {
    return {
      ...bookData,
      authorId: bookData.author_id,
      coverUrl: bookData.cover_thumb_url,
      goodreadsUrl: bookData.goodreads_url,
      tagIds: bookData.tag_ids,
      popularity: bookData.popularity,
      globalRank: bookData.global_rank,
    }
  }
}

export default Book
