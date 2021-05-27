class BookDetails {
  static parse(data) {
    return {
      ...data,
      originalTitle: data.original_title,
      goodreadsUrl: data.goodreads_url,
      wikiUrl: data.wiki_url,
      imageUrl: data.image_url,
      authorId: data.author_id,
      yearPublished: data.year_published
    }
  }
}

export default BookDetails
